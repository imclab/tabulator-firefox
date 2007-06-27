var tabulator = {};

/////////////////////////  Logging
//
//bitmask levels
TNONE = 0; 
TERROR = 1;
TWARN = 2;
TMESG = 4;
TSUCCESS = 8;
TINFO = 16;
TDEBUG = 32;
TALL = 63;
logging = {
    ascending : false, 
    level: 7
//    level : TERROR | TWARN //default
};

function escapeForXML(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;')
}

tabulator.log = {}
tabulator.log.msg =function (str, type, typestr) {
    if (!type) { type = TMESG; typestr = 'mesg'};
    if (!(logging.level & type)) return; //bitmask
    var log_area = document.getElementById('status');
    if (!log_area) return;
    
    var addendum = document.createElement("span");
    addendum.setAttribute('class', typestr);
    var now = new Date();
    addendum.innerHTML = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds()
            + " [" + typestr + "] "+ escapeForXML(str) + "<br/>";
    if (logging.ascending)
        log_area.appendChild(addendum);
    else
        log_area.insertBefore(addendum, log_area.firstChild);
} //tabulator.log.msg

tabulator.log.warn = function(msg) { tabulator.log.msg(msg, TWARN, 'warn') };
tabulator.log.debug = function(msg)   { tabulator.log.msg(msg, TDEBUG, 'dbug') };
tabulator.log.info = function(msg)    { tabulator.log.msg(msg, TINFO, 'info') };
tabulator.log.error = function(msg)   { tabulator.log.msg(msg, TERROR, 'eror') };
tabulator.log.success = function(msg) { tabulator.log.msg(msg, TSUCCESS, 'good') };

/** clear the log window **/
function clearStatus(str) {
    var x = document.getElementById('status');
    if (!x) return;
    //x.innerHTML = "";
    emptyNode(x);
} //clearStatus

/** set the logging level **/
function setLogging(x) {
    logging.level = TALL;
    fyi("Logging "+x);
    logging.level = x;
}

function dumpStore() {
    var l = logging.level;
    logging.level = TALL;
    fyi("\nStore:\n" + kb + "__________________\n");
    tdebug("subject index: " + kb.subjectIndex[0] + kb.subjectIndex[1]);
    tdebug("object index: " + kb.objectIndex[0] + kb.objectIndex[1]);
    logging.level = l;
}

function dumpHTML() {
    var l = logging.level;
    logging.level = TALL;
    fyi(document.innerHTML);
    logging.level = l
}