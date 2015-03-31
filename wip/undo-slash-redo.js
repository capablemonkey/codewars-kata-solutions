function undoRedo(object) {
  var actions = [];

  var popLastAction = function() {
    var actionsOnly = actions.filter(function(a) { return a.action === 'set' || a.action === 'del'; });
    if (actionsOnly.length === 0) { throw 'No action to undo'; }

    var lastAction = actionsOnly[actionsOnly.length - 1];
    var i = actions.indexOf(lastAction);
    actions.splice(i, 1);

    return lastAction;
  };

  return {
    set: function(key, value) {
      actions.push({
        action: 'set',
        key: key,
        value: object[key] || null
      });
      
      object[key] = value;
    },
    get: function(key) {
      return object[key];
    },
    del: function(key) {
      // persist old key and value
      actions.push({
        action: 'set',
        key: key,
        value: object[key]
      });
      
      delete object[key];
    },
    undo: function() {
      console.log(actions)
      var a = popLastAction();
      console.log('undoing: ', a);

      var currentValue = null;

      if (a.action === 'set') {
        currentValue = object[a.key];

        if (a.value === null) { // key did not exist before we set it
          delete object[a.key];
        } else {
          object[a.key] = a.value;
        }
      } else if (a.action === 'del') {
        // restore the old key/value
        object[a.key] = a.value;
      }

      actions.push({
        action: 'undo',
        key: a.key,
        value: currentValue,
        undidAction: a
      });
    },
    redo: function() {
      if (actions[actions.length - 1].action === 'undo') {
        var undo = actions[actions.length - 1];

        if (undo.undidAction.action === 'set') {
          object[undo.key] = undo.value;
        } else if (undo.undidAction.action === 'del') {
          delete object[undo.key];
        }

        actions.pop(); // get rid of undo action
        //actions.push(undo.undidAction);  // add the action we just did
      } else {
        throw 'No undo to redo.';
      }
    }
  };
}

var obj = {
  x: 1,
  y: 2
};

var unRe = undoRedo(obj);

unRe.set('y', 10);
unRe.set('y', 100);
unRe.set('x', 150);
unRe.set('x', 50);

console.log(unRe.get('y'), 100, 'The get method returns the value of a key');
console.log(unRe.get('x'), 50, 'The get method returns the value of a key');
unRe.undo();
console.log(unRe.get('x'), 150, 'The undo method restores the previous state');
console.log(unRe.get('y'), 100, 'The y key stays the same');
unRe.redo();
console.log(unRe.get('x'), 50, 'Undo the x value');
console.log(unRe.get('y'), 100, 'The y key stays the same');
unRe.undo();
unRe.undo();
console.log(unRe.get('x'), 1, 'Undo the x value');
console.log(unRe.get('y'), 100, 'The y key stays the same');

unRe.undo();
unRe.undo();
console.log(unRe.get('y'), 2, 'Undo the y value');
console.log(unRe.get('x'), 1, 'The x key stays the same');
try {
  unRe.undo();
  Test.expect(false, 'It should have thrown an exception');
  
} catch (e) {
  console.log(unRe.get('y'), 2, 'There is nothing to undo');
}
unRe.redo();
unRe.redo();
unRe.redo();
unRe.redo();
console.log(unRe.get('y'), 100, 'y key redo state');
console.log(unRe.get('x'), 50, 'y key redo state');
try {
  unRe.redo();
  Test.expect(false, 'It should have thrown an exception');
  
} catch (e) {
  console.log(unRe.get('y'), 100, 'There is nothing to redo');
}