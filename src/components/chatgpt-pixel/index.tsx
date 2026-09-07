// ChatGPT ads pixel — must be in the <head>, one setup script per page
const ChatGptPixel = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `!function(w,d,s,u){if(w.oaiq)return;var q=function(){q.q.push(arguments)};q.q=[];w.oaiq=q;var j=d.createElement(s);j.async=1;j.src=u;var f=d.getElementsByTagName(s)[0];f.parentNode.insertBefore(j,f)}(window,document,"script","https://bzrcdn.openai.com/sdk/oaiq.min.js");oaiq("init",{pixelId:"AJG3FRfDQxwaM86U8nNkpq",debug:true});`,
    }}
  />
);

export default ChatGptPixel;
