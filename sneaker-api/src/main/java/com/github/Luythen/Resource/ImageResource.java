package com.github.Luythen.Resource;

import com.github.Luythen.Service.ImageService;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Response;

@Path("/images")
@Produces("image/png")
public class ImageResource {
    @GET
    @Path("{ImgName}")
    public Response getImageByName (@PathParam("ImgName") String imgName) {
        ImageService imageService = new ImageService();
        try {
            return Response.status(200).entity(imageService.findImage(imgName)).build();
        } catch (Exception e) {
            return Response.status(404).entity(e.getMessage()).build();
        }
    }

}
