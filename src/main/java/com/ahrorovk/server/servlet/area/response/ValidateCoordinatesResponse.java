package com.ahrorovk.server.servlet.area.response;

public record ValidateCoordinatesResponse(
        Double x,
        Double y,
        Double r,
        boolean result,
        String time,
        long bench
){
}
