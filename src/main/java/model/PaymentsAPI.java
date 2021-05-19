package model;

import model.Payment;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import java.sql.Date;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class PaymentsAPI
 */
@WebServlet("/PaymentsAPI")
public class PaymentsAPI extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	public int Order_ID;
	public int cvv;
	public Date paid_date;
	public int hidItemIDSave;
	
	Payment payObj = new Payment();
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public PaymentsAPI() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//doGet(request, response);
		
		String output = payObj.insertOrderPayment(
				Order_ID = Integer.parseInt(request.getParameter("Order_ID")),
				request.getParameter("amount"),
				request.getParameter("credit_card_no"),
				cvv = Integer.parseInt(request.getParameter("cvv")),
				request.getParameter("payment_status"),
				//request.getParameter("paid_date"));
				paid_date = paid_date);
				
		response.getWriter().write(output);
	}

	/**
	 * @see HttpServlet#doPut(HttpServletRequest, HttpServletResponse)
	 */
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		Map paras = getParasMap(request);
		 String output = payObj.updateOrderPayment(
				 hidItemIDSave = Integer.parseInt(paras.get("hidItemIDSave").toString()),
				 Order_ID = Integer.parseInt(paras.get("Order_ID").toString()),
				 paras.get("amount").toString(),
				 paras.get("credit_card_no").toString(),
				 cvv = Integer.parseInt(paras.get("cvv").toString()),
				 paras.get("payment_status").toString(),
				 paid_date = paid_date);
		 
		response.getWriter().write(output); 
	}

	/**
	 * @see HttpServlet#doDelete(HttpServletRequest, HttpServletResponse)
	 */
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		Map paras = getParasMap(request);
		 String output = payObj.deleteOrderPayment(paras.get("pid").toString());
		response.getWriter().write(output);
	}
	
	// Convert request parameters to a Map
	private static Map getParasMap(HttpServletRequest request)
	{
	 Map<String, String> map = new HashMap<String, String>();
	try
	 {
	 Scanner scanner = new Scanner(request.getInputStream(), "UTF-8");
	 String queryString = scanner.hasNext() ?
	 scanner.useDelimiter("\\A").next() : "";
	 scanner.close();
	 String[] params = queryString.split("&");
	 for (String param : params)
	 { String[] p = param.split("=");
	 map.put(p[0], p[1]);
	 }
	 }
	catch (Exception e)
	 {
	 }
	return map;
	}


}
