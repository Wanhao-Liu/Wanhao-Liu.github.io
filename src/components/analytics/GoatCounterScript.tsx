import Script from 'next/script';

export default function GoatCounterScript() {
  return (
    <Script
      data-goatcounter="https://wanhao.goatcounter.com/count"
      src="https://gc.zgo.at/count.js"
      strategy="afterInteractive"
    />
  );
}
