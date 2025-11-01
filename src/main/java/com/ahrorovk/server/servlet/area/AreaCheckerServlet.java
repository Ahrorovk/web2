package com.ahrorovk.server.servlet.area;

import com.ahrorovk.server.servlet.area.response.ValidateCoordinatesResponse;
import com.ahrorovk.server.servlet.area.util.CoordinatesChecker;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public final class AreaCheckerServlet extends HttpServlet {
    private static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("HH:mm:ss");

    private void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        final long start = System.nanoTime();

        final double x = Double.parseDouble(request.getParameter("x"));
        final double y = Double.parseDouble(request.getParameter("y"));
        final double r = Double.parseDouble(request.getParameter("r"));
        final String format = Optional.ofNullable(request.getParameter("format")).orElse("full");
        final String time = DATE_FORMAT.format(new Date());

        boolean hit = CoordinatesChecker.check(x, y, r);

        ServletContext context = getServletContext();
        ValidateCoordinatesResponse validateResponse;
        synchronized (context) {
            List<ValidateCoordinatesResponse> results = (List<ValidateCoordinatesResponse>) context.getAttribute("results");
            if (results == null) {
                results = new ArrayList<>();
                context.setAttribute("results", results);
            }
            validateResponse = new ValidateCoordinatesResponse(x, y, r, hit, time, System.nanoTime() - start);
            results.add(validateResponse);
        }

        if ("params".equals(format)) {
            String htmlResponse = "<tr>" +
                    "<td>" + validateResponse.x() + "</td>" +
                    "<td>" + validateResponse.y() + "</td>" +
                    "<td>" + validateResponse.r() + "</td>" +
                    "<td>" + (validateResponse.result() ? "Yes" : "No") + "</td>" +
                    "<td>" + time + "</td>" +
                    "<td>" + validateResponse.bench() + "</td>" +
                    "</tr>";

            response.setContentType("text/html");
            response.getWriter().write(htmlResponse);
        } else {
            RequestDispatcher dispatcher = request.getRequestDispatcher("index2.jsp");
            dispatcher.forward(request, response);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }
}