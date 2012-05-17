define(['sandbox', 'text!../templates/todos.html'], function(sandbox, todosTemplate){
    return sandbox.mvc.View({

        //... is a list tag.
        tagName:  "li",
    
        // Cache the template function for a single item.
        template: sandbox.template.parse(todosTemplate),
    
        // The DOM events specific to an item.
        events: {
          "click .check"              : "toggleDone",
          "dblclick div.todo-content" : "edit",
          "click span.todo-destroy"   : "clear",
          "keypress .todo-input"      : "updateOnEnter",
          "blur .todo-input"          : "close"
        },
    
        // The TodoView listens for changes to its model, re-rendering. Since there's
        // a one-to-one correspondence between a **Todo** and a **TodoView** in this
        // app, we set a direct reference on the model for convenience.
        initialize: function() {
          this.model.bind('change', this.render, this);
          this.model.bind('destroy', this.remove, this);
        },
    
        // Re-render the contents of the todo item.
        render: function() {
          //we need to figure out whether it makes sense to relook this up
          //when backbone is caching the reference for us
          //sandbox.dom.find(this.el).html(this.template(this.model.toJSON()));
          this.$el.html(this.template(this.model.toJSON()));

         // sandbox.dom.find(this.$el).html(this.template(this.model.toJSON()));

          //this.input = sandbox.dom.find('.todo-input'); // @todo
          //this.input = this.$('.edit .todo-input');
          this.input = sandbox.dom.find('.todo-input', this.$('.edit'));
          return this;
        },
    
        // Toggle the `"done"` state of the model.
        toggleDone: function() {
          this.model.toggle();
        },
    
        // Switch this view into `"editing"` mode, displaying the input field.
        edit: function() {
          //sandbox.dom.find(this.el).addClass("editing");
          this.$el.addClass("editing");
          this.input.focus();
        },
    
        // Close the `"editing"` mode, saving changes to the todo.
        close: function() {
          var value = this.input.val();
          if (!value) this.clear();
          this.model.save({content: value});
          this.$el.removeClass("editing");
          //sandbox.dom.find(this.el).removeClass("editing");
        },
    
        // If you hit `enter`, we're through editing the item.
        updateOnEnter: function(e) {
          if (e.keyCode == 13) this.close();
        },
    
        // Remove the item, destroy the model.
        clear: function() {
          this.model.clear();
        }

    });
});
