<%@page import="model.Payment" %>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">

<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery.min.js"></script>
<script src="Components/payments.js"></script>

<title>Make Payment</title>
</head>
<body>

<div class="container">
 		<div class="row">
 			<div class="col-8">
 				<h1 class="m-3">Payment details</h1>

					<form id="formPayment" name="formPayment" method="post" action="payments.jsp">
 					Order ID:
					<input id="Order_ID" name="Order_ID" type="text"
 					class="form-control form-control-sm">
					<br> Amount:
					<input id="amount" name="amount" type="text"
 					class="form-control form-control-sm">
					<br> Credit Card Number:
					<input id="credit_card_no" name="credit_card_no" type="text"
 					class="form-control form-control-sm">
					<br> CVV:
					<input id="cvv" name="cvv" type="text"
					class="form-control form-control-sm">
					<br> Payment Status:
					<input id="payment_status" name="payment_status" type="text"
					class="form-control form-control-sm">
					<br> Paid Date:
					<input id="paid_date" name="paid_date" type="date" placeholder="YYYY-MM-DD"
					class="form-control form-control-sm">
					<br>
					<input id="btnSave" name="btnSave" type="button" value="Save"
 					class="btn btn-primary">
					<input type="hidden" id="hidItemIDSave" name="hidItemIDSave" value="">
					</form>
					
					<br>
					
					<div id="alertSuccess" class="alert alert-success"></div>
					<div id="alertError" class="alert alert-danger"></div>
	
				<br>
	
			<div id="divPaymentGrid">
				<%
					Payment payObj = new Payment();
					out.print(payObj.readOrderPayment());
				%>
			</div>

			</div>
 		</div>

 	<br>
 		<div class="row">
 		<div class="col-12" id="colStudents">

 		</div>
 		</div>
	</div>

</body>
</html>