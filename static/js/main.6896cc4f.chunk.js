(this.webpackJsonpastute_game=this.webpackJsonpastute_game||[]).push([[0],{67:function(e,t,n){},68:function(e,t,n){},69:function(e,t,n){},76:function(e,t,n){},77:function(e,t,n){},79:function(e,t,n){},80:function(e,t,n){},82:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(27),s=n.n(c),i=(n(67),n(68),n(7)),o=n(42),l=n.n(o),j=n(43),b=n.n(j),f=n(44),u=n.n(f),d=n(40),h=n.n(d),O=(n(69),n(2)),v=function(){return Object(O.jsxs)("div",{className:"footer",children:[Object(O.jsx)("span",{children:"Made by Divyansh Singh"}),Object(O.jsx)(h.a,{}),Object(O.jsx)("span",{children:"+91 8003695517"}),Object(O.jsx)(l.a,{}),Object(O.jsx)("span",{children:"divy97@gmail.com"}),Object(O.jsx)(b.a,{}),Object(O.jsx)("a",{href:"https://www.linkedin.com/in/divyansh-singh-03777371/",target:"_blank",children:"Divyansh Singh"}),Object(O.jsx)(u.a,{}),Object(O.jsx)("a",{href:"https://github.com/divyansh9711",target:"_blank",children:"divyansh9711"})]})},m=(n(76),function(e){var t=e.tileColor,n=e.tileValue,r=Object(a.useState)({backgroundColor:"white"}),c=Object(i.a)(r,2),s=c[0],o=c[1],l={0:"white",2:"#FFE1B1",4:"#F9C064",8:"#F1AC3D",16:"#D5FE5D",32:"#9ECA1B",64:"#5BBE13",128:"#12AB00"};return Object(a.useEffect)((function(){o({backgroundColor:l[n]||"#FFFFFF"})}),[t,n]),Object(O.jsx)("div",{className:"border",style:s,children:Object(O.jsx)("span",{children:n})})});m.defaultProps={tileValue:"",tileColor:"#ffffff"};var x=m,g=(n(77),n(123)),p=function(e){var t=e.arrowEvent,n=Object(a.useState)([[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]),r=Object(i.a)(n,1)[0],c=Object(a.useState)(r),s=Object(i.a)(c,2),o=s[0],l=s[1],j=Object(a.useState)(0),b=Object(i.a)(j,2),f=b[0],u=b[1],d=Object(a.useState)(0),h=Object(i.a)(d,2),v=h[0],m=h[1],p=Object(a.useState)(0),w=Object(i.a)(p,2),_=w[0],k=w[1],N=Object(a.useState)(0),y=Object(i.a)(N,2),M=y[0],S=y[1],F=Object(a.useState)(!0),C=Object(i.a)(F,2),A=C[0],E=C[1],B=Object(a.useState)("Moves Available"),D=Object(i.a)(B,2),W=D[0],G=D[1],P=Object(a.useState)({color:"green",fontWeight:"normal"}),L=Object(i.a)(P,2),T=L[0],I=L[1];Object(a.useEffect)((function(){"reset"!==t&&U(t)}),[t]);var V=function(e){var t=H(e),n=J(t[0]),a=t[1]||n[1],r=H(n[0]);return l(r[0]),[r[0],a,n[2]]},z=function(e){var t=K(e),n=V(t);return[K(n[0]),n[1],n[2]]},H=function(e){for(var t=!1,n=[],a=0;a<4;a++)n.push([0,0,0,0]);for(var r=0;r<4;r++)for(var c=0,s=0;s<4;s++)0!==e[r][s]&&(n[r][c]=e[r][s],s!==c&&(t=!0),c+=1);return[n,t]},J=function(e){for(var t=!1,n=0,a=0;a<4;a++)for(var r=0;r<3;r++)e[a][r]===e[a][r+1]&&0!==e[a][r]&&(e[a][r]=2*e[a][r],e[a][r+1]=0,k(_+e[a][r]),n+=e[a][r],t=!0);return[e,t,_+n]},K=function(e){for(var t=[],n=0;n<4;n++){t.push([]);for(var a=0;a<4;a++)t[n].push(e[n][3-a])}return t},R=function(e){for(var t=[],n=0;n<4;n++){t.push([]);for(var a=0;a<4;a++)t[n].push(e[a][n])}return t},U=function(e){if("new"===e&&(l(r),u(0),k(0),E(!0),I({color:"green",fontWeight:"normal"}),G("Moves Available")),A){var t=[o,!0],n=!0;switch(e){case"left":t=V(o);break;case"right":t=z(o);break;case"up":t=function(e){var t=R(e),n=V(t);return[R(n[0]),n[1],n[2]]}(o);break;case"down":t=function(e){var t=R(e),n=z(t);return[R(n[0]),n[1],n[2]]}(o);break;default:n=!1}n&&(l(t[0]),u(f+1)),function(e,t){for(var n=0;n<4;n++)for(var a=0;a<4;a++)if(128===e[n][a])return I({color:"darkolivegreen",fontWeight:"bold"}),G("Congractulations! You won"),(f<v||0===v)&&m(f+1),(0===M||t>M)&&S(t),k(t),void E(!1);for(var r=0;r<4;r++)for(var c=0;c<4;c++)if(0===e[r][c])return I({color:"#A08D1A",fontWeight:"normal"}),void G("Moves Available");I({color:"#A08D1A",fontWeight:"normal"}),G("Tile Merge is possible");for(var s=0;s<3;s++)for(var i=0;i<3;i++)if(e[s][i]===e[s+1][i]||e[s][i]===e[s][i+1])return;for(var o=0;o<3;o++)if(e[3][o]===e[3][o+1])return;for(var l=0;l<3;l++)if(e[l][3]===e[l+1][3])return;I({color:"Maroon",fontWeight:"bold"}),G("Game Over, Merge Not Possible"),E(!1)}(t[0],t[2]),A&&(t[0]=function(e){for(var t=0,n=!1,a=Math.floor(4*Math.random()),r=Math.floor(4*Math.random());0!==e[a][r];)if(t+=1,a=Math.floor(4*Math.random()),r=Math.floor(4*Math.random()),t>100){n=!0;break}if(n){console.log("Finding empty tile iteratively");for(var c=0;c<4;c++)for(var s=0;s<4;s++)if(0===o[c][s])return e[c][s]=2,e}return e[a][r]=2,e}(t[0]))}};return Object(O.jsxs)("div",{className:"game_body",children:[Object(O.jsx)("div",{className:"grid",children:o.map((function(e){return Object(O.jsx)("div",{className:"grid_row",children:e.map((function(e){return Object(O.jsx)(x,{tileValue:e})}))})}))}),Object(O.jsxs)("div",{className:"game_summary",children:[Object(O.jsxs)("div",{className:"info_row",children:[Object(O.jsx)(g.a,{children:"Status: "}),Object(O.jsx)("span",{style:T,className:"info_text",children:W})]}),Object(O.jsxs)("div",{className:"info_row",children:[Object(O.jsx)(g.a,{children:"Win with Minimum number of moves: "}),Object(O.jsxs)("span",{className:"info_text",children:[v," Moves"]})]}),Object(O.jsxs)("div",{className:"info_row",children:[Object(O.jsx)(g.a,{children:"Total Moves: "}),Object(O.jsxs)("span",{className:"info_text",children:[f," Moves"]})]}),Object(O.jsxs)("div",{className:"info_row",children:[Object(O.jsx)(g.a,{children:"Score to 128: "}),Object(O.jsxs)("span",{className:"info_text",children:[_," Points"]})]}),Object(O.jsxs)("div",{className:"info_row",children:[Object(O.jsx)(g.a,{children:"Session Best Score: "}),Object(O.jsxs)("span",{className:"info_text",children:[M," Points"]})]}),Object(O.jsxs)("div",{className:"info_row",children:[Object(O.jsx)(g.a,{children:"How to play: "}),Object(O.jsx)("span",{className:"info_text",children:" Use arrow keys, refer to these "}),Object(O.jsx)("a",{href:"https://levelskip.com/puzzle/How-to-play-2048",target:"_blank",className:"info_text",children:"rules"})]}),Object(O.jsxs)("div",{className:"info_row",children:[Object(O.jsx)(g.a,{children:"Link to algorithm: "}),Object(O.jsx)("a",{href:"https://www.geeksforgeeks.org/2048-game-in-python/",target:"_blank",className:"info_text",children:"Game implementation in Python"})]}),Object(O.jsxs)("div",{className:"info_row",children:[Object(O.jsx)(g.a,{children:"Link to source code: "}),Object(O.jsx)("a",{href:"https://github.com/divyansh9711/128-Tile-Game",target:"_blank",className:"info_text",children:"Github"})]})]})]})},w=(n(79),function(){return Object(O.jsx)("div",{className:"header",children:Object(O.jsx)("span",{children:" 128 Game "})})}),_=(n(80),n(122)),k=function(){var e=Object(a.useState)(null),t=Object(i.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(""),s=Object(i.a)(c,2),o=s[0],l=s[1];Object(a.useEffect)((function(){window.innerWidth<800&&alert("Game not scaled for mobile devices, please use a computer"),j()}),[]);var j=function(){document.addEventListener("keydown",(function(e){switch(e.keyCode){case 37:r("left"),r("reset"),l("");break;case 38:r("up"),r("reset"),l("");break;case 39:r("right"),r("reset"),l("");break;case 40:r("down"),r("reset"),l("");break;default:l("Invalid Key Input")}}))};return Object(O.jsxs)("div",{children:[Object(O.jsxs)("div",{className:"main_content",children:[Object(O.jsx)(w,{}),Object(O.jsx)("div",{className:"game_controller",children:Object(O.jsx)(_.a,{text:"Reset Game",onClick:function(){r("new")}})}),Object(O.jsx)(p,{arrowEvent:n}),Object(O.jsx)("div",{className:"warning_label",children:Object(O.jsx)("span",{children:o})})]}),Object(O.jsx)(v,{})]})};var N=function(){return Object(O.jsx)("div",{className:"App",children:Object(O.jsx)(k,{})})},y=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,125)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),a(e),r(e),c(e),s(e)}))};s.a.render(Object(O.jsx)(r.a.StrictMode,{children:Object(O.jsx)(N,{})}),document.getElementById("root")),y()}},[[82,1,2]]]);
//# sourceMappingURL=main.6896cc4f.chunk.js.map