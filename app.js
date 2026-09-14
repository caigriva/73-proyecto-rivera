const KEY="rivera73";

let data=JSON.parse(localStorage.getItem(KEY)) || {
  peso:79,
  xp:0,
  racha:0,
  historial:[],
  misiones:{}
};

if(!data.misiones) data.misiones={};

function guardarDatos(){
  localStorage.setItem(KEY, JSON.stringify(data));
}

function nivel(){
  if(data.peso<=73)return["Leyenda","🐺✨"];
  if(data.peso<=75)return["Élite","🐺⚡"];
  if(data.peso<=77)return["Corredor","🐺🔥"];
  return["Recluta","🐺"];
}

function render(){

  document.getElementById("peso").innerText=data.peso.toFixed(1);

  let p=((79-data.peso)/6)*100;
  p=Math.max(0,Math.min(100,p));

  document.getElementById("fill").style.width=p+"%";
  document.getElementById("progreso").innerText=Math.round(p)+"%";
  document.getElementById("xp").innerText=data.xp;
  document.getElementById("racha").innerText=data.racha;

  const n=nivel();

  document.getElementById("nivel").innerText=n[0];
  document.getElementById("wolf").innerText=n[1];

  document.querySelectorAll(".m").forEach((c,i)=>{
    c.checked = data.misiones[i] === true;
  });

  const h=document.getElementById("historial");
  h.innerHTML="";

  data.historial.slice().reverse().forEach(i=>{
    const d=document.createElement("div");
    d.innerHTML=`<span>${i.fecha}</span><b>${i.peso} kg</b>`;
    h.appendChild(d);
  });
}

document.getElementById("guardarMisiones").onclick=()=>{

  let nuevoXP=0;
  let completadas=0;

  document.querySelectorAll(".m").forEach((c,i)=>{

    data.misiones[i]=c.checked;

    if(c.checked){
      nuevoXP+=Number(c.dataset.xp);
      completadas++;
    }

  });

  data.xp=nuevoXP;
  data.racha=completadas;

  guardarDatos();

  document.getElementById("mensajeMisiones").innerText="✅ Misiones guardadas";

  render();
};

document.getElementById("guardar").onclick=()=>{

  const p=parseFloat(document.getElementById("nuevoPeso").value);

  if(isNaN(p))return;

  data.peso=p;

  data.historial.push({
    fecha:new Date().toLocaleDateString("es-CL"),
    peso:p
  });

  document.getElementById("nuevoPeso").value="";

  guardarDatos();
  render();
};

render();
