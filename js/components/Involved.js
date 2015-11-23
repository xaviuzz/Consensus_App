Involved = CUORE.Class(CUORE.Component, {

    _startState: function() {
      this.storeKey="person.involved.name";
      this._declareRenderer();
      this.involved = "the person involved";
    },

    _declareRenderer: function(){
      this.renderer = Renderers.involved();
    },

    _wireEvents: function() {
      this.dispatchUsing("updateInvolved","NAMES_generate_EXECUTED");
    },

    draw: function(){
      this.doRender();
    },

    doRender: function(){
      this.renderer.doRender(this.container, this._prepareData());
    },

    _prepareData: function(){
      return {"name": this.involved};
    },

    updateInvolved: function(response) {
      this._setName(response);
      this.updateRender();
    },

    _setName: function(name) {
      this.involved = name;
      this._saveName();
    },

    _saveName: function(){
      document.page.save(this.storeKey, this.involved);
    },
    
    onEnvironmentUp: function(page) {
      var savedName=page.retrieve(this.storeKey);
      if (savedName){
        this.updateInvolved(savedName);
        return;
      }
      this.execute("NAMES","generate");
    },

});