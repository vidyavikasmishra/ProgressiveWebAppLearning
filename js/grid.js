(function () {
    $("#grid").shieldGrid({
        dataSource: {
            data: getValue(),
            schema: {
                fields: {
                    id: { path: "id", type: Number },
                    age: { path: "age", type: Number },
                    personName: { path: "personName", type: String },
                                  }
            }
        },
        sorting: {
            multiple: true
        },
        rowHover: false,
        columns: [
            { field: "personName", title: "Person Name", width: "120px" },
            { field: "age", title: "Age", width: "80px" },          
            {
                width: "104px",
                title: "Delete Column",
                buttons: [
                    { cls: "deleteButton", commandName: "delete", caption: "<span>Delete</span>" }
                ]
            }
        ],
        editing: {
            enabled: true,
            event: "click",
            type: "cell",
            confirmation: {
                "delete": {
                    enabled: true,
                    template: function (item) {
                        return "Delete row with ID = " + item.id
                    }
                }
            }
        },
        events:
        {
            getCustomEditorValue: function (e) {
                e.value = $("#dropdown").swidget().value();
                $("#dropdown").swidget().destroy();
            }
        }
    });

   
})();




function getValue()
{    
    return gridData=  idbApp.showEmployees();  
   /*   [{"personName":"Test1","age":"29","companyName":"Test","dob":"02/07/1992",
    "email":"test@gmail.com","customerEditor":"Test","id":1},
    {"personName":"Test2","age":"29","companyName":"est","dob":"02/07/1898","email":"uop@gmail.com",
    "customerEditor":"Harley","id":2}]  */
    

}


