client = new appClient();
settings = new appSettings();
model = new appModel();

colors = {
    "Mint1":"#AEF0D050","Mint2":"#4FE59BAA","Mint3":"#27C18F7F","Mint4":"#0EA272","Mint5":"Mint",
    "Rust1":"#D95A4025","Rust2":"#F0D06B50","Rust3":"#D95A407F","Rust4":"#501E31CD","Rust5":"Rust",
    "Royal1":"#F8DE7E90","Royal2":"#F8DE7E","Royal3":"#FFD300A0","Royal4":"#FFD300CC","Suref5":"Royal",
    "Lilac1":"#9683EC30","Lilac2":"#B666D250","Lilac3":"#B666D2BF","Lilac4":"#9683EC","Lilac5":"Lilac",
    "Surf1":"#B1E5C550","Surf2":"#B1E5C5","Surf3":"#5C9EA8","Surf4":"#1E4593","Surf5":"Surf"
}
document.onkeydown = keyPressed;
function keyPressed(e) {
    var src=document.activeElement;
    var trg;
    if (e.keyCode == '38') {
        trg=src.previousElementSibling;
        for (var i=0;i<3 && trg.previousElementSibling;i++){
            trg=trg.previousElementSibling;
        }
    }
    else if (e.keyCode == '40') {
        var trg=src.nextElementSibling;
        for (var i=0;i<3 && trg.nextElementSibling;i++){
            trg=trg.nextElementSibling;
        }
    }
    else if (e.keyCode == '37') {
        var trg=src.previousElementSibling;
    }
    else if (e.keyCode == '39') {
        var trg=src.nextElementSibling;
    }
    if (trg){
        src.blur();
        trg.focus();
    }
}

function appClient(){
    this.activeTab="confTab";
    this.color="Surf";
    this.addComponent = function(node,type,cname,id,value,inner){
        var newElement = document.createElement(type);
        newElement.innerHTML=inner;
        newElement.setAttribute("class",cname);
        newElement.setAttribute("id",id);
        newElement.setAttribute("value",value);
        document.getElementById(node).after(newElement);
        return newElement;
    }
    this.setTab = function(target){
        var current = document.getElementById(this.activeTab);
        current.classList.remove("activeTab");
        document.getElementById(target).classList.add("activeTab");        
        if (target!=this.activeTab){            
            src=document.getElementById(this.activeTab.replace("Tab","View"));
            trg=document.getElementById(target.replace("Tab","View"));
            src.style.opacity="0";
            setTimeout(function() {
                src.style.display="none";
                trg.style.display="block";
                setTimeout(function() {
                    trg.style.opacity="1";
                }, 75);      
            }, 75); 
        }
        this.activeTab=target;
    }
    this.setColor = function(value){
        this.color=value;
        var current = document.getElementsByClassName("pickerSelected");
        current[0].classList.remove("pickerSelected");
        document.getElementById(value).classList.add("pickerSelected");
        let root = document.documentElement;
        root.style.setProperty('--accent-color', colors[value+4]);
        root.style.setProperty('--accent-soft', colors[value+3]);
        root.style.setProperty('--gradient-80', colors[value+4]);
        root.style.setProperty('--gradient-30', colors[value+2]);
        root.style.setProperty('--gradient-10', colors[value+1]);
    }
    this.setSettings = function(){        
        for (a=0;a<Object.keys(colors).length;a++){
            if (a%5==0){
                var obj=client.addComponent("pickerTarget","div","pickerItem",colors[Object.keys(colors)[a+4]],null,null);
                obj.addEventListener("click",function(){client.setColor(this.id);settings.setColor(this.id)});;
                obj.tabIndex=a%5;
                obj.style="background:linear-gradient(153deg,"+colors[Object.keys(colors)[a]]+" 0%, "+colors[Object.keys(colors)[a+1]]+" 20%,"+colors[Object.keys(colors)[a+2]]+" 69%,"+colors[Object.keys(colors)[a+3]]+" 100%);";
                obj.title=colors[Object.keys(colors)[a+4]];
            }
        }
        settings.getColor() ? this.setColor(settings.getColor()) : this.setColor(client.color);
        document.getElementById("pickerTarget").remove();
    }
    this.updateInput=function(input){
        switch (input){
            case "gamepad":
                document.getElementById("inputType").src="Images/gamepad-icon.png"
                break;
            default:
                document.getElementById("inputType").src="Images/default-icon.png"
                break;
        }
    }
}
function appSettings(){
    this.carName = localStorage.getItem("carName");
    this.setupState = localStorage.getItem("setupState");
    this.saveProgress= function(step){
        switch (step) {
            case "1":
                localStorage.setItem("setupState", 1);
                localStorage.removeItem("resetProcess");
                localStorage.setItem("carName", document.getElementById("carName").value);
                break;
            case "2":
                localStorage.setItem("setupState", 2);
                break;
            case "3":   
                var setupAddress = document.getElementById("setupAddress").value;  
                localStorage.setItem("setupAddress", setupAddress);
                break;
        }
    }
    this.setColor = function(value){
        localStorage.setItem("colorTheme", value);
    }
    this.getColor = function(){
        return localStorage.getItem("colorTheme");
    }
    this.clear = function(){
        localStorage.clear();
        localStorage.setItem("resetProcess", true);
        slide(document.getElementById("home_7"),document.getElementById("home_0"));
    }
}

function appModel(){
    this.tryConnexion = function (url,callback,obj)
    {
        var req = new XMLHttpRequest();
        req.open('HEAD', url);
        req.onreadystatechange = function() {
            if (this.readyState==4){
                parameters=[this.status,obj]
                callback(parameters);
            }
        };
        req.send();
    }
}

function hostReachable(parameters){
    if (parameters[0]){
        switch (parameters[1].id){
            case "1":
                sendConfiguration(parameters[1]);
                break;
            default:
                slideViews(parameters[1]);
                break;
        }        
    }else{
        alert("Vous n'êtes pas connecté au réseau de votre DiPi");
    }
}
function isP2P(){
    if (parameters[0]){
        showView(document.getElementById("home_1"));
    }else{
        setInterface();
    }
}
function sendConfiguration(obj){                    //A TESTER ET ADAPTER
    var inputTrg=document.getElementsByClassName("inputTrg");
    var conf = {
        "hostname":inputTrg[0].value,
        "ssid":inputTrg[1].value,
        "wpa":inputTrg[2].value
     }
     //PAS SUR QUE LA REQUETE SOIT BONNE
    var req = new XMLHttpRequest();
    req.open("POST","/jsonreception");
    req.setRequestHeader("Content-Type","application/json");
    req.onreadystatechange = function() {
        if (req.status==200){
            settings.saveProgress(obj.id);
            slideViews(obj);
        }else{
            alert("Une erreur inattendue est survenue");
        }
    };
    req.send(JSON.stringify(conf)); //ON ENVOIE L'OBJET conf EN JSON
    
}
function iniPage(){                 //Initialise les éléments et ajoute les events listeners
    var tabItem=document.getElementsByClassName("tabItem");
    for(var i=0;i<tabItem.length;i++){
        tabItem[i].addEventListener("click",function(){client.setTab(this.id);});
    }
    var btn=document.getElementsByClassName("slideViewBtn");
    for(var i=0;i<btn.length;i++){
        btn[i].addEventListener("click",function(){slideViews(this);});
    }
    var checkHost=document.getElementsByClassName("checkHost");
    for(var i=0;i<checkHost.length;i++){
        checkHost[i].addEventListener("click",function(){model.tryConnexion(window.location,hostReachable,this);});
    }
    var checkConfig=document.getElementsByClassName("checkConfig");
    for(var i=0;i<checkConfig.length;i++){
        checkConfig[i].addEventListener("click",function(){checkConfiguration(this)});
    }
    document.getElementById("inputsValidation").addEventListener("click",function(){inputsValidation(this) ? slideViews(this) : alert("La configuration est incomplète")});
    var saveStep=document.getElementsByClassName("stepAction");
    for(var i=0;i<saveStep.length;i++){
        saveStep[i].addEventListener("click",function(){settings.saveProgress(this.id);});
    }
    var views = document.getElementById("confView").children;
    for (var i=0;i<views.length;i++){
        hideView(views[i]);
    }
    client.setTab(client.activeTab);
    model.tryConnexion(window.location,isP2P);
    client.setSettings();
    showView(document.getElementById("confView"));
}

function inputsValidation(){                 //Assigne les inputs dans un récapitulatif, vérifie les champs
    var inputSrc=document.getElementsByClassName("inputSrc");
    var inputTrg=document.getElementsByClassName("inputTrg");
    var error=[];
    for (var i=0;i<inputSrc.length;i++){        
        if (!inputSrc[i].value){
            error.push(inputSrc[i].name);
        }
        else
        {
            for (var j=0;j<inputTrg.length;j++){
                if (inputSrc[i].name==inputTrg[j].name){
                    inputTrg[j].value=inputSrc[i].value;
                }
            }
        }
    }
    return error.length==0
}
function setInterface(){                    //Détermine l'affichage de l'application selon la situation
    if (localStorage.getItem("resetProcess")){
        showView(document.getElementById("home_0"));
    }
    else if (settings.setupState)
    {
        var setupAddress = localStorage.getItem("setupAddress");
        if (settings.setupState >= 1){
            showView(document.getElementById("home_7"));  
            document.getElementById("setupAddress").value=setupAddress;
        }else{
            showView(document.getElementById("home_1")); 
        }
    }
    else{
        showView(document.getElementById("home_0"));    
    }
}

function slideViews(obj){                   //Réalise un fondu de transition entre les écrans de paramétrage
    var view=obj.parentElement.id.split("_");
    var ind = parseInt(view[1],10);
    if (obj.value=="next"){
        var target = document.getElementById(view[0]+"_"+(ind+1));
    }else if (obj.value=="previous"){
        var target = document.getElementById(view[0]+"_"+(ind-1));
    }else if (obj.value=="p2pMode"){
        var target = document.getElementById(view[0]+"_8");
    }
    else if (obj.value=="load"){
        loadView();        
    }
    if (target){
            slide(obj.parentElement,target);
    }
}
function slide(src,trg){
    src.style.maxHeight="100px"; 
    setTimeout(function() {
        src.style.opacity="0";                    
        setTimeout(function() {
            src.style.display="none";
            trg.style.display="block";                
            setTimeout(function() {
                trg.style.maxHeight="500px";
                trg.style.opacity="1";                    
            }, 250);      
        }, 250);  
    }, 150); 
}
function hideView(obj){
    obj.style.display="none";
    obj.style.opacity="0";
    obj.style.maxHeight="0";
}
function showView(obj){
    obj.style.display="block";
    obj.style.opacity="1";
    obj.style.maxHeight="100%";
}
function loadView(){
    var carTab = document.getElementById("carTab");
    document.getElementById("confTab").innerHTML="Paramètres";
    carTab.innerHTML=settings.carName;
    carTab.style.display="block";
    client.addComponent("carTab","li","tabItem","statTab",null,"<a>Statistiques</a>").addEventListener("click",function(){client.setTab(this.id);});;
    client.setTab("carTab");
    var carView = document.getElementById("carView");
    carView.src="http://"+document.getElementById("setupAddress").value+"/deviceview.html"; //TODO change for actual url for the view
    carView.style.display="block";
}

function checkConfiguration(obj){                  //TODO Function that looks if the server is configured or not
    if (true){
        client.addComponent("localMode1","p",null,null,null,"Votre DiPi est déjà configurée. Vous pouvez la reconfigurer ou ignorer.");
    }else{
        client.addComponent("localMode1","p",null,null,null,"Votre DiPi n'a pas encore été configurée pour le réseau local.");
    }
    slideViews(obj);
}