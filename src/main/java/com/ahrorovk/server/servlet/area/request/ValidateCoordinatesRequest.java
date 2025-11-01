package com.ahrorovk.server.servlet.area.request;

public record ValidateCoordinatesRequest(
        Double x,
        Double y,
        Double r
){
}
