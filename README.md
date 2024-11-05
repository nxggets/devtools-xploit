# devtools-xploit
## what is this ? 
this is an example of a vulnerability that has existed for quite some time, it has been discovered by [FWSmasher](https://github.com/FWSmasher/rigtools). this exploit uses devtool's websockets to send a network request to the client. this was bypassed and was made that it sent a javascript payload request to the client and you click on it and it opens a payload that takes over a school managed extension
## what does that mean ?
it means that since you took over the extension, you have the **extension's privileges**, which means you can disable any extensions (it is temporary, it turns on after you restart the device)
## what is this repository about and how to use it ?
this is only giving the basic devtools code to send websocket request on network session,
to use this 
```
$ git clone https://github.com/nxggets/devtools-xploit.git
$ cd devtools-xploit
$ npm i 
# then run the server
$ node index.js 
```
next you **FIRST** need to go to this url: `devtools://devtools/bundled/devtools_app.html`
next you go to this url : `devtools://devtools/bundled/devtools_app.html?experiments=true&ws=*websocket url*` then you click on "Network" , you should see a gray box appear, double click it and your payload should execute, **KEEP IN MIND** that there is a diffrence between **WSS** and **WS**, **wss connects on https only and ws connects on http**