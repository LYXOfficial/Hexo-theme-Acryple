let lyxTalk={}
lyxTalk.init=function(appId,appKey,serverURL,pageSize){
  AV.init({
    appId: appId,
    appKey: appKey,
    serverURL:serverURL
  })
  const q = new AV.Query('content');
  q.find().then((l) => {
    console.log(l)
  });
}
