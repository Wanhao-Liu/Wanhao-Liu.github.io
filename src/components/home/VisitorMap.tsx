'use client';

import { useEffect, useRef, useState } from 'react';

type LeafletMap = { remove: () => void; zoomControl: { setPosition: (position: string) => void } };
type LeafletTileLayer = {
  addTo: (map: LeafletMap) => LeafletTileLayer;
  on: (event: 'load' | 'tileerror', handler: () => void) => LeafletTileLayer;
};
type LeafletApi = {
  map: (element: HTMLElement, options: Record<string, unknown>) => LeafletMap;
  tileLayer: (url: string, options: Record<string, unknown>) => LeafletTileLayer;
  circleMarker: (position: [number, number], options: Record<string, unknown>) => { addTo: (map: LeafletMap) => void };
};

declare global {
  interface Window { L?: LeafletApi }
}

const markers: Array<[number, number]> = [
  [22.32, 114.17], [23.13, 113.26], [31.23, 121.47], [39.9, 116.4], [35.68, 139.69],
  [37.57, 126.98], [1.35, 103.82], [51.51, -0.13], [48.86, 2.35], [52.52, 13.41],
  [40.71, -74.01], [34.05, -118.24], [43.65, -79.38], [-33.87, 151.21], [-37.81, 144.96],
];

let leafletPromise: Promise<LeafletApi> | null = null;

function loadLeafletStyles() {
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLLinkElement>('link[data-leaflet-css]');
    if (existing?.dataset.loadState === 'ready' || existing?.sheet) return resolve();
    const stylesheet = existing ?? document.createElement('link');
    if (!existing) {
      stylesheet.rel = 'stylesheet';
      stylesheet.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      stylesheet.dataset.leafletCss = 'true';
    }
    stylesheet.addEventListener('load', () => { stylesheet.dataset.loadState = 'ready'; resolve(); }, { once: true });
    stylesheet.addEventListener('error', () => reject(new Error('Leaflet styles failed to load')), { once: true });
    if (!existing) document.head.appendChild(stylesheet);
  });
}

function loadLeafletScript() {
  if (window.L) return Promise.resolve(window.L);
  return new Promise<LeafletApi>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-leaflet-js]');
    const script = existing ?? document.createElement('script');
    if (!existing) {
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.async = true;
      script.dataset.leafletJs = 'true';
      document.body.appendChild(script);
    }
    script.addEventListener('load', () => window.L ? resolve(window.L) : reject(new Error('Leaflet unavailable')), { once: true });
    script.addEventListener('error', () => reject(new Error('Leaflet failed to load')), { once: true });
  });
}

function loadLeaflet() {
  if (leafletPromise) return leafletPromise;
  leafletPromise = Promise.all([loadLeafletStyles(), loadLeafletScript()])
    .then(([, leaflet]) => leaflet)
    .catch((error) => {
      leafletPromise = null;
      throw error;
    });
  return leafletPromise;
}

export default function VisitorMap({ locale }: { locale: 'en' | 'zh' }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    if (!('IntersectionObserver' in window)) {
      const timer = setTimeout(() => setVisible(true), 0);
      return () => clearTimeout(timer);
    }
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setVisible(true), { rootMargin: '160px' });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || !containerRef.current) return;
    let map: LeafletMap | null = null;
    let cancelled = false;
    setStatus('loading');
    loadLeaflet().then((leaflet) => {
      if (cancelled || !containerRef.current) return;
      map = leaflet.map(containerRef.current, { center: [24, 20], zoom: 1, scrollWheelZoom: false });
      leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap', maxZoom: 19 })
        .on('load', () => !cancelled && setStatus('ready'))
        .on('tileerror', () => !cancelled && setStatus('error'))
        .addTo(map);
      markers.forEach((marker) => leaflet.circleMarker(marker, { radius: 6, fillColor: '#2563eb', fillOpacity: 0.55, color: '#1d4ed8', weight: 1 }).addTo(map!));
      map.zoomControl.setPosition('topleft');
    }).catch(() => !cancelled && setStatus('error'));
    return () => { cancelled = true; map?.remove(); };
  }, [visible]);

  return (
    <div className="visitor-map" data-map-state={status} aria-label={locale === 'zh' ? '访问地图' : 'Visitor map'}>
      <div ref={containerRef} className="visitor-map-canvas" />
      {status !== 'ready' && <span className="visitor-map-status">{locale === 'zh' ? '访问地图' : 'Visitor map'}</span>}
    </div>
  );
}
