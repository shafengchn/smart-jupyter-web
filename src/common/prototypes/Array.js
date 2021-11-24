
Array.prototype.contains = function (obj) {
    let index = this.length;
    while (index--) {
        if (this[index] == obj) {
            return true;
        }
    }
    return false;
};

Array.prototype.deleteByIndex = function (index) {
    return this.splice(index,1);
}
Array.prototype.removeByKey = function (key,id) {
    for (let i=0;i<this.length;i++) {
        if(this[i][key] && this[i][key]==id) {
            return this.deleteByIndex(i)
        }
    }
}
Array.prototype.remove = function (data) {
    for (let i=0;i<this.length;i++) {
        if(this[i]==data) {
            return this.deleteByIndex(i);
        }
    }
}

Array.prototype.insert = function (index, data) {
    this.splice(index,0,data);
    return this;
}

Array.prototype.replace = function (index,data) {
    let oldData = this.splice(index, 1);
    this.splice(index, 0, data);
    return oldData;
}
Array.prototype.replaceByKey = function (keyName, keyValue, data) {
    for(let i=0;i<this.length;i++) {
        if(this[i][keyName]==keyValue) {
            this.replace(i, data)
        }
    }
}

Array.prototype.parseNumber=function(){
    let newArr = new Array();
    this.map(val=>{
        if(Number(val)){
            newArr.push(Number(val));
        }
    })
    return newArr;
}

Array.prototype.sortInt=function(){
    return this.sort((a,b) => a-b );
}

Array.prototype.comparePush = function(data, compare = loopItem =>{ return false; }){
    let index = this.length;
    let canPush = false;
    while (index--) {
        if(compare(this[index])){
            canPush = true;
            break;
        }
    }
    if(canPush) this.push(data);
}

Array.prototype.compareConcat = function(arr, compare = item => !this.contains(item)){ //连接数组,默认比较方法为不包含当前项的就放入
    arr.map(item => {
        if (compare(item)) this.push(item);
    });
}

Array.prototype.getByKey = function(keyName, keyValue, defaultObj) {
    
    for(let i=0;i<this.length;i++) {
        if(this[i][keyName]==keyValue) return this[i];
    }
    return defaultObj;
}


