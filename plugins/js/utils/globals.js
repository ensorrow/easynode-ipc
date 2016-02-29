module.exports = {

  set:function(key,obj){
      if( !key || !obj )return;

      localStorage.setItem(key,JSON.stringify(obj))
  },
  get: function(key){
      if( !key ) return null;

      return JSON.parse(localStorage.getItem(key));
  }
}
