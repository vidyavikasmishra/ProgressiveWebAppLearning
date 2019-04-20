var idbApp = (function() {
  'use strict';

  if (!('indexedDB' in window)) {
    console.log('This browser doesn\'t support IndexedDB');
    return;
  }

  // Creating DB, Table and setting Index
  var dbPromise = idb.open('PWAAppDB', 1, function(upgradeDb) {  
  
        console.log('Creating the Employees object store');
        upgradeDb.createObjectStore('employees', {keyPath: 'id', autoIncrement:true});
        var store = upgradeDb.transaction.objectStore('employees');
        store.createIndex('PersonName', 'PersonName', {unique: true});
        store.createIndex("Age", "Age", { unique: false });
        store.createIndex("CompanyName", "CompanyName", { unique: false });
  });


  function addEmployees() {
    dbPromise.then(function(db) {
      var tx = db.transaction('employees', 'readwrite');
      var store = tx.objectStore('employees');

      var items = [
        {
          personName: document.querySelector('#PersonName').value,
          age:document.getElementById("Age").value,
          companyName:document.getElementById("CompanyName").value,
          dob:document.getElementById("DOB").value,
          email: document.getElementById("EmailAddress").value,
          customerEditor: document.getElementById("CustomerEditor").value
        }
      ];
      return Promise.all(items.map(function(item) {
          console.log('Adding item: ', item);
          return store.add(item);
        })
      ).catch(function(e) {
        tx.abort();
        console.log(e);
      }).then(function() {
        console.log('All items added successfully!');
      });
    });
  }

  
  function showEmployees()
  {
    var jsonResult="";
    dbPromise.then(function(db) {
      var tx = db.transaction('employees', 'readonly');
      var store = tx.objectStore('employees');
      
      return store.openCursor();
    }).then(function showRange(cursor) {
      if (!cursor) {return;}           
      jsonResult +=JSON.stringify(cursor.value);  
      jsonResult+=",";    
     return cursor.continue().then(showRange);
    }).then(function() {
      if (jsonResult === '') {console.log('<p>No results.</p>');}
      var validJasonReply= "[" + jsonResult.slice(0,jsonResult.length-1) + "]";
     console.log(validJasonReply);
      return validJasonReply;
    });;   
  }

  return {
    dbPromise: (dbPromise),
    addEmployees: (addEmployees),    
    showEmployees:(showEmployees)
  };
})();



