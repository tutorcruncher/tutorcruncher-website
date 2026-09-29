// Diginius lead intelligence (Snowplow-based) — must be in the <head>, once per page
const DiginiusAnalytics = () => (
  <script
    type="text/javascript"
    dangerouslySetInnerHTML={{
      __html: `;(function(p,l,o,w,i,n,g){if(!p[i]){p.GlobalSnowplowNamespace=p.GlobalSnowplowNamespace||[];p.GlobalSnowplowNamespace.push(i);p[i]=function(){(p[i].q=p[i].q||[]).push(arguments)};p[i].q=p[i].q||[];n=l.createElement(o);g=l.getElementsByTagName(o)[0];n.async=1;n.src=w;g.parentNode.insertBefore(n,g)}}(window,document,"script","//d1hsde1uwi6p0a.cloudfront.net/version/hq9xnghz.js","diginius"));
window.diginius('newTracker', 'cf', 'd2zinxbvgvxnpa.cloudfront.net', {appId: 'b596sYmzbBf7Bjtj1IqcvuVMHmg2', platform: 'web', contexts: {geolocation: false, performanceTiming: true, gaCookies: true}});
window.diginius('enableLinkClickTracking');
window.diginius('enableActivityTracking', 5, 10);
window.diginius('trackPageView');`,
    }}
  />
);

export default DiginiusAnalytics;
