using Hotel_managemnet_system.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Hotel_managemnet_system.Controllers
{
    [RoutePrefix("api/rooms")]
    public class RoomsController : ApiController
    {
        HotelEntities entities = new HotelEntities();

        [HttpPost, Route("addNewRoom")]
        [CustomAuthenticationFilter]
        public HttpResponseMessage AddNewRoom([FromBody] Room room)
        {
            try
            {
                var token = Request.Headers.GetValues("Authorization").FirstOrDefault();
                TokenClaim tokenClaim = TokenManager.ValidateToken(token);
                if (tokenClaim.role != "admin")
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, new { message = "You are not authorized to add room" });
                }
                entities.Rooms.Add(room);
                entities.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, new { message = "Room added successfully" });
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, e);
            }
        }

        [HttpGet, Route("getRooms")]
        [CustomAuthenticationFilter]
        public HttpResponseMessage GetRooms()
        {
            try
            {
                var token = Request.Headers.GetValues("Authorization").FirstOrDefault();
                TokenClaim tokenClaim = TokenManager.ValidateToken(token);
                if (tokenClaim.role != "admin" && tokenClaim.role != "user")
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, new { message = "You are not authorized to view rooms" });
                }
                List<Room> rooms = entities.Rooms.ToList();
                return Request.CreateResponse(HttpStatusCode.OK, rooms);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, e);
            }
        }

        [HttpPost, Route("updateRooms")]
        [CustomAuthenticationFilter]
        public HttpResponseMessage UpdateRooms([FromBody] Room room)
        {
            try
            {
                var token = Request.Headers.GetValues("Authorization").FirstOrDefault();
                TokenClaim tokenClaim = TokenManager.ValidateToken(token);
                if (tokenClaim.role != "admin")
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, new { message = "You are not authorized to update room" });
                }
                Room updateRoom = entities.Rooms.Find(room.roomID);
                if (updateRoom != null)
                {
                    updateRoom.roomType = room.roomType ?? updateRoom.roomType;
                    updateRoom.price = room.price ?? updateRoom.price;
                    updateRoom.roomNumber = room.roomNumber ?? updateRoom.roomNumber;
                    updateRoom.roomDescription = room.roomDescription ?? updateRoom.roomDescription;
                    updateRoom.roomImage = room.roomImage ?? updateRoom.roomImage;
                    entities.Entry(updateRoom).State = System.Data.Entity.EntityState.Modified;
                    entities.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, new { message = "Room updated successfully" });
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, new { message = "Room not found" });
                }
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, e);
            }
        }
    }
}
