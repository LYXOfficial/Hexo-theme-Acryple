// function setCookie(cname, cvalue) {
//     //   var d = new Date();
//     //   d.setTime(d.getTime()+(exdays*24*60*60*1000));
//     //   var expires = "expires="+d.toGMTString();
//     //   document.cookie = cname + "=" + cvalue + "; " + expires;
//     document.cookie = cname + "=" + cvalue + ";";
// }
// function getCookie(cname) {
//     var name = cname + "=";
//     var ca = document.cookie.split(';');
//     for (var i = 0; i < ca.length; i++) {
//         var c = ca[i].trim();
//         if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
//     }
//     return "";
// }
// function GetUrlRelativePath() {
//     var url = document.location.toString();
//     var arrUrl = url.split("//");

//     var start = arrUrl[1].indexOf("/");
//     var relUrl = arrUrl[1].substring(start);

//     if (relUrl.indexOf("?") != -1) {
//         relUrl = relUrl.split("?")[0];
//     }
//     return relUrl;
// }
// $(document).ready(function () {
//     const {
//         Query,
//         User
//     } = AV;
//     AV.init({
//         appId: "IvW3T1NjMoh7OmKEdAz1tM0o-gzGzoHsz",
//         appKey: "vG8s9ukVO5bgozEHzR923dew",
//         serverURL: "https://ivw3t1nj.lc-cn-n1-shared.com"
//     });
//     var dianzans = [];
//     var hrefs = [];
//     var ids = [];
//     const query2 = new AV.Query('dianzan');
//     query2.find().then((dzs) => {
//         for (i = dzs.length - 1; i >= 0; i--) {
//             dianzans.push(dzs[i]["attributes"]["count"]);
//             hrefs.push(dzs[i]["attributes"]["href"]);
//             ids.push(dzs[i]["id"])
//         }
//         index = hrefs.indexOf(GetUrlRelativePath());
//         console.log(dianzans[index])
//         if (dianzans[index] === undefined) {
//             document.getElementsByClassName("dianzan-count")[0].innerText = "0";
//         } else {
//             document.getElementsByClassName("dianzan-count")[0].innerText = dianzans[index];
//         }
//         if (hrefs.indexOf(GetUrlRelativePath()) == -1) {
//             const TestObject = AV.Object.extend('dianzan');
//             const testObject = new TestObject();
//             testObject.set('href', GetUrlRelativePath());
//             testObject.set('count', 0);
//             testObject.save();
//         }
//     });
// })

// function setCount() {
//     var dianzans = [];
//     var hrefs = [];
//     var ids = [];
//     const query2 = new AV.Query('dianzan');
//     query2.find().then((dzs) => {
//         for (i = dzs.length - 1; i >= 0; i--) {
//             dianzans.push(dzs[i]["attributes"]["count"]);
//             hrefs.push(dzs[i]["attributes"]["href"]);
//             ids.push(dzs[i]["id"])
//         }
//         index = hrefs.indexOf(GetUrlRelativePath());
//         console.log(dianzans[index])
//         if (dianzans[index] === undefined) {
//             document.getElementsByClassName("dianzan-count")[0].innerText = "0";
//         } else {
//             document.getElementsByClassName("dianzan-count")[0].innerText = dianzans[index];
//         }
//     });
//     if (getCookie(GetUrlRelativePath() + "isZaned") == "1") {
//         document.getElementsByClassName("fa-thumbs-up")[0].setAttribute("style", "color:var(--lyx-blue)!important")
//     }
//     else {
//         document.getElementsByClassName("fa-thumbs-up")[0].setAttribute("style", "")
//     }
// }

// function dianzan() {
//     if (getCookie(GetUrlRelativePath() + "isZaned") != "1") {
//         // try {
//             var dianzans = [];
//             var hrefs = [];
//             var ids = [];
//             const query = new AV.Query('dianzan');
//             query.find().then((dzs) => {
//                 for (i = dzs.length - 1; i >= 0; i--) {
//                     dianzans.push(dzs[i]["attributes"]["count"]);
//                     hrefs.push(dzs[i]["attributes"]["href"]);
//                     ids.push(dzs[i]["id"])
//                 }
//                 index = hrefs.indexOf(GetUrlRelativePath());
//                 console.log(ids[index])
//                 query.get(ids[index]).then((todo) => {
//                     todo.set('count', dianzans[index] + 1);
//                     todo.save();
//                     setCookie(GetUrlRelativePath() + "isZaned", "1")
//                     setCount();
//                 });
                
//             });
//         // } catch (err) {

//         // }
//     }
//     else {
//         try {
//             var dianzans = [];
//             var hrefs = [];
//             var ids = [];
//             const query = new AV.Query('dianzan');
//             query.find().then((dzs) => {
//                 for (i = dzs.length - 1; i >= 0; i--) {
//                     dianzans.push(dzs[i]["attributes"]["count"]);
//                     hrefs.push(dzs[i]["attributes"]["href"]);
//                     ids.push(dzs[i]["id"])
//                 }
//                 index = hrefs.indexOf(GetUrlRelativePath());
//                 console.log(ids[index])
//                 query.get(ids[index]).then((todo) => {
//                     todo.set('count', dianzans[index] - 1);
//                     todo.save();
//                     setCookie(GetUrlRelativePath() + "isZaned", "0");
//                     setCount();
//                 });
                
//             });
//         } catch (err) { }
//     }
// }

function GetUrlRelativePath() {
    var url = document.location.toString();
    var arrUrl = url.split("//");

    var start = arrUrl[1].indexOf("/");
    var relUrl = arrUrl[1].substring(start);

    if (relUrl.indexOf("?") != -1) {
        relUrl = relUrl.split("?")[0];
    }
    return relUrl;
}
loadDianzan=(function () {
    const {
        Query,
        User
    } = AV;
    AV.init({
        appId: "IvW3T1NjMoh7OmKEdAz1tM0o-gzGzoHsz",
        appKey: "vG8s9ukVO5bgozEHzR923dew",
        serverURL: "https://ivw3t1nj.lc-cn-n1-shared.com"
    });
    var dianzans = [];
    var hrefs = [];
    var ids = [];
    const query2 = new AV.Query('dianzan');
    query2.find().then((dzs) => {
        for (i = dzs.length - 1; i >= 0; i--) {
            dianzans.push(dzs[i]["attributes"]["count"]);
            hrefs.push(dzs[i]["attributes"]["href"]);
            ids.push(dzs[i]["id"])
        }
        index = hrefs.indexOf(GetUrlRelativePath());
        console.log(dianzans[index])
        if (dianzans[index] === undefined) {
            document.getElementsByClassName("dianzan-count")[0].innerText = "0";
        } else {
            document.getElementsByClassName("dianzan-count")[0].innerText = dianzans[index];
        }
    });
})

document.addEventListener("DOMContentLoaded",loadDianzan);
document.addEventListener("pjax:complete",loadDianzan);

function setCount() {
    var dianzans = [];
    var hrefs = [];
    var ids = [];
    const query2 = new AV.Query('dianzan');
    query2.find().then((dzs) => {
        for (i = dzs.length - 1; i >= 0; i--) {
            dianzans.push(dzs[i]["attributes"]["count"]);
            hrefs.push(dzs[i]["attributes"]["href"]);
            ids.push(dzs[i]["id"])
        }
        index = hrefs.indexOf(GetUrlRelativePath());
        console.log(dianzans[index])
        if (dianzans[index] === undefined) {
            document.getElementsByClassName("dianzan-count")[0].innerText = "1";
        } else {
            document.getElementsByClassName("dianzan-count")[0].innerText = dianzans[index] + 1;
        }
    });
}

function dianzan() {
    try {
        var dianzans = [];
        var hrefs = [];
        var ids = [];
        const query = new AV.Query('dianzan');
        query.find().then((dzs) => {
            for (i = dzs.length - 1; i >= 0; i--) {
                dianzans.push(dzs[i]["attributes"]["count"]);
                hrefs.push(dzs[i]["attributes"]["href"]);
                ids.push(dzs[i]["id"])
            }
            if (hrefs.indexOf(GetUrlRelativePath()) == -1) {
                console.log(1)
                const TestObject = AV.Object.extend('dianzan');
                const testObject = new TestObject();
                testObject.set('href', GetUrlRelativePath());
                testObject.set('count', 1);
                testObject.save();
            } else {
                index = hrefs.indexOf(GetUrlRelativePath());
                console.log(ids[index])
                query.get(ids[index]).then((todo) => {
                    todo.set('count', dianzans[index] + 1);
                    todo.save();
                });
            }
            setCount();
        });
    } catch (err) {
        const TestObject = AV.Object.extend('dianzan');
        const testObject = new TestObject();
        testObject.set('href', GetUrlRelativePath());
        testObject.set('count', 1);
        testObject.save();
    }

}