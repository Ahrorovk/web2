package com.ahrorovk.server.servlet.area.util;

import com.ahrorovk.server.servlet.area.request.ValidateCoordinatesRequest;


public class CoordinatesChecker {
    public static boolean check(ValidateCoordinatesRequest request) {
        return check(request.x(), request.y(), request.r());
    }


    public static boolean check(double x, double y, double r) {
        boolean area1 = (x >= 0 && y >= 0 && x + y <= r);

        boolean area2 = (x <= 0 && y >= 0 && x * x + y * y <= r * r / 4.0);


        boolean area3 = (x >= -r / 2.0 && x <= 0 && y >= -r && y <= 0);
        
        return area1 || area2 || area3;
    }
}
