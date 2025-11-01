package com.ahrorovk.server.servlet;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public final class ControllerServlet extends HttpServlet {

    private void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String x = request.getParameter("x");
        String y = request.getParameter("y");
        String r = request.getParameter("r");

        String mode = request.getParameter("mode");

        log("x: " + x + ", y: " + y + ", r: " + r + ", mode: " + mode);

        RequestDispatcher dispatcher;
        if (x != null && y != null && r != null) dispatcher = request.getRequestDispatcher("/areaCheck");
        else dispatcher = request.getRequestDispatcher("/index2.jsp");
        dispatcher.forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }
}