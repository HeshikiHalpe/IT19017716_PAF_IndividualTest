/**
 * 
 */
$(document).ready(function()
{
	if ($("#alertSuccess").text().trim() == "")
 	{
 		$("#alertSuccess").hide();
 	}
 	$("#alertError").hide();
});

// SAVE ============================================
$(document).on("click", "#btnSave", function(event)
{
	// Clear alerts---------------------
 	$("#alertSuccess").text("");
 	$("#alertSuccess").hide();
 	$("#alertError").text("");
 	$("#alertError").hide();

	// Form validation-------------------
	var status = validatePaymentForm();
	if (status != true)
 	{
 		$("#alertError").text(status);
 		$("#alertError").show();
 		return;
 	}

	// If valid------------------------
 	var type = ($("#hidItemIDSave").val() == "") ? "POST" : "PUT";

	$.ajax(
 	{
 		url : "PaymentsAPI",
 		type : type,
 		data : $("#formPayment").serialize(),
 		dataType : "text",
 		complete : function(response, status)
 		{
 			onItemSaveComplete(response.responseText, status);
 		}		
 	});
});

// UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event)
{
 	$("#hidItemIDSave").val($(this).data("pid")); 
 	$("#Order_ID").val($(this).closest("tr").find('td:eq(0)').text());
 	$("#amount").val($(this).closest("tr").find('td:eq(1)').text());
 	$("#credit_card_no").val($(this).closest("tr").find('td:eq(2)').text());
 	$("#cvv").val($(this).closest("tr").find('td:eq(3)').text());
	$("#payment_status").val($(this).closest("tr").find('td:eq(4)').text());
	$("#paid_date").val($(this).closest("tr").find('td:eq(5)').text());
});

// Remove
$(document).on("click", ".btnRemove", function(event)
{
 	$.ajax(
 	{
 		url : "PaymentsAPI",
 		type : "DELETE",
 		data : "pid=" + $(this).data("pid"),
 		dataType : "text",
 		complete : function(response, status)
 		{
 			onItemDeleteComplete(response.responseText, status);
 		}
 	});
});

// CLIENT-MODEL================================================================
function validatePaymentForm()
{
	// Order ID
	if ($("#Order_ID").val().trim() == "")
 	{
 		return "Insert Order ID.";
 	}
	// is numerical value
	var tmpOrID = $("#Order_ID").val().trim();
	if (!$.isNumeric(tmpOrID))
 	{
 		return "Insert a numerical value for Order ID.";
 	}

	// Amount
	if ($("#amount").val().trim() == "")
 	{
 		return "Insert Payment Amount.";
 	}
	// is numerical value
	var tmpamnt = $("#amount").val().trim();
	if (!$.isNumeric(tmpamnt))
 	{
 		return "Insert a numerical value for payment amount.";
 	}
	// convert to decimal price
 	$("#amount").val(parseFloat(tmpamnt).toFixed(2));

	// Credit Card Number-------------------------------
	if ($("#credit_card_no").val().trim() == "")
 	{
 		return "Insert Credit Card Number.";
 	}
	
	// CVV------------------------
	if ($("#cvv").val().trim() == "")
 	{
 		return "Insert valid cvv.";
 	}

	// Payment Status------------------------
	if ($("#payment_status").val().trim() == "")
 	{
 		return "Insert Payment Status.";
 	}

	if ($("#paid_date").val().trim() == "")
 	{
 		return "Insert Payment Date.";
 	}
	
	return true;
}

// save handler
function onPaymentSaveComplete(response, status)
{
if (status == "success")
{
 	var resultSet = JSON.parse(response);
 	if (resultSet.status.trim() == "success")
 	{
 		$("#alertSuccess").text("Successfully saved.");
 		$("#alertSuccess").show();
 		$("#divPaymentGrid").html(resultSet.data);
 	} else if (resultSet.status.trim() == "error")
 		{
 			$("#alertError").text(resultSet.data);
 			$("#alertError").show();
		}
 } else if (status == "error")
 		{
 			$("#alertError").text("Error while saving.");
 			$("#alertError").show();
 		} else
 			{
 				$("#alertError").text("Unknown error while saving..");
 				$("#alertError").show();
 			} 
		$("#hidItemIDSave").val("");
 		$("#formPayment")[0].reset();
}

// delete handler
function onPaymentDeleteComplete(response, status)
{
	if (status == "success")
 	{
 		var resultSet = JSON.parse(response);
 		if (resultSet.status.trim() == "success")
 		{
 			$("#alertSuccess").text("Successfully deleted.");
 			$("#alertSuccess").show();
 			$("#divPaymentGrid").html(resultSet.data);
 		} else if (resultSet.status.trim() == "error")
 		{
 			$("#alertError").text(resultSet.data);
 			$("#alertError").show();
 		}
 	} else if (status == "error")
 		{
 			$("#alertError").text("Error while deleting.");
 			$("#alertError").show();
 		} else
 			{
 				$("#alertError").text("Unknown error while deleting..");
 				$("#alertError").show();
 			}
}
