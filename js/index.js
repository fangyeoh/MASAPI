function myFunction() {
    document.getElementById("myForm").reset();
}

function myFieldName(v_valueview) {

    switch (v_valueview) {
        case "prime_lending_rate":
            v_checkboxName = "Prime Lending Rate";
        break;
        case "banks_fixed_deposits_3m":
            v_checkboxName = "Banks Fixed Deposits 3 Months";
        break;
        case "banks_fixed_deposits_6m":
            v_checkboxName = "Banks Fixed Deposits 6 Months";
        break;
        case "banks_fixed_deposits_12m":
            v_checkboxName = "Banks Fixed Deposits 12 Months";
        break;
        case "banks_savings_deposits":
            v_checkboxName = "Banks Savings Deposits";
        break;
        case "fc_hire_purchase_motor_3y":
            v_checkboxName = "Finance Companies Loans - Hire Purchase of New Vehicles For 3 Years";
        break;
        case "fc_housing_loans_15y":
            v_checkboxName = "Finance Companies Housing Loans For 15 Years.";
        break;
        case "fc_fixed_deposits_3m":
            v_checkboxName = "Finance Companies Fixed Deposits 3 Months";
        break;
        case "fc_fixed_deposits_6m":
            v_checkboxName = "Finance Companies Fixed Deposits 6 Months";
        break;
        case "fc_fixed_deposits_12m":
            v_checkboxName = "Finance Companies Fixed Deposits 12 Months";
        break;
        case "fc_savings_deposits":
            v_checkboxName = "Finance Companies Savings Deposits";
        break;
    }

    return v_checkboxName;              // The function returns the v_checkboxName
}

function check(thisform)
{
    var v_rateSel = document.getElementsByName("rates");
    var e = document.getElementById("strYear");
    var v_strYear = e.options [e.selectedIndex] .value;
    var f = document.getElementById("endYear");
    var v_endYear = f.options [f.selectedIndex] .value;
    var g = document.getElementById("strMon");
    var v_strMon = g.options [g.selectedIndex] .value;
    var h = document.getElementById("endMon");
    var v_endMon = h.options [h.selectedIndex] .value;
    var v_opp_cnt = 0;
    var checkboxview = "";
    var v_fields = ["end_of_month"];
    var showtable = "<table border =2><tr><td>Period(YYYY-MM)</td>"
    for(var y = 0; y < v_rateSel.length; y++) {
        if (v_rateSel[y].checked) {

            var valueView = v_rateSel[y].value;

            checkboxName = myFieldName(valueView);
           
            showtable+= '<td>'+checkboxName+'</td>'

            if (checkboxview == "") {
                checkboxview = valueView;
            }
            else{
                checkboxview = checkboxview +','+ valueView;
            }
            v_fields.push(valueView);
            v_opp_cnt ++;

        }
    }
    showtable += "</tr>"
    if (v_opp_cnt == 0) {
        alert("Please choose at least one checkbox to view the rates!");
        return false;
    }
    else if (v_strYear > v_endYear)
    {
        alert("You have selected invalid year .");
        return false;
    }
    else if (v_strYear == v_endYear)
    {
        if (v_strMon > v_endMon)
        {
            alert("You have selected invalid month .");
            return false;
        }
    }
    

        if (v_strYear == v_endYear && v_strMon == v_endMon ){
        var v_date = v_strYear+"-"+v_strMon;
        }
        else{  
        var v_date = v_strYear+"-"+v_strMon+","+v_endYear+"-"+v_endMon;
        }
    //alert("Your date values: "+v_date);
    //alert("Your field values: "+checkboxview);
    
        if (v_strYear == v_endYear && v_strMon == v_endMon ){
            var column = {
                resource_id:'5f2b18a8-0883-4769-a635-879c63d3caac',
                fields: 'end_of_month,'+checkboxview,
                'filters[end_of_month]': v_date
            }
        }
        else{  
            var column = {
                resource_id:'5f2b18a8-0883-4769-a635-879c63d3caac',
                fields: 'end_of_month,'+checkboxview,
                'between[end_of_month]': v_date
            }
        }
    
    $.ajax({  
    url: 'https://eservices.mas.gov.sg/api/action/datastore/search.json',  
    data:column,  
    dataType:'json',  
    success:function(column){ 
        var compare=0;
        $.each(column.result.records, function() {
            showtable += "<tr>";
                $.each(this, function (name, value) {
                    //alert(name + '=' + value)
                    showtable += "<td>";
                    showtable += value;
                    showtable += "</td>";
                });
            showtable += "</tr>";
            }); 
            showtable += "</table>";
    
     $('#tablerate').html("");
     $('#tablerate').append(showtable);

       //alert('Total results found:'+ column.result.total)
    }  
    }); 
}

var year = {  
    resource_id:'5f2b18a8-0883-4769-a635-879c63d3caac',//the resource id  
    fields: 'end_of_month',
    sort: 'end_of_month desc'

    }; 
var field = {  
    resource_id:'5f2b18a8-0883-4769-a635-879c63d3caac'//the resource id  
    };   
    
$.ajax({  
    url: 'https://eservices.mas.gov.sg/api/action/datastore/search.json',  
    data:year,  
    dataType:'json',  
    success:function(year){  

       var optionString ="";

       //alert('Total results found:'+ year.result.limit)

       for(i=0;i<year.result.limit;i++)
       {
       var d = "";
       var d = year.result.records[i].end_of_month;
       var optionValue = d.substr(0, 4);
       var optionText = d.substr(0, 4);

       if (!optionString.includes(optionValue)){
        optionString += "<option value='"+optionValue+"'>"+optionText+"</option>";
       }

       }
       $('#strYear').append(optionString);
       $('#endYear').append(optionString);
    }  
    
    }); 
$.ajax({  
    url: 'https://eservices.mas.gov.sg/api/action/datastore/search.json',  
    data:field,  
    dataType:'json',  
    success:function(field){  

        //alert('Total first field found:'+ field.result.fields[1].id)
       
     var checkBoxString ="";
       for(i=2;i<13;i++)
       {
       var d = "";
       var d = field.result.fields[i].id;
       var checkboxValue = d;

       checkboxName = myFieldName(checkboxValue);

      checkBoxString += "<input type='checkbox' name='rates' value='"+checkboxValue+"'>"+checkboxName+"<br>";
       }

       $('#list').append(checkBoxString);
    }  
    
    }); 