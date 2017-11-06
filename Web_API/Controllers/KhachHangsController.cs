using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Web_API.Models;

namespace Web_API.Controllers
{
    public class KhachHangsController : ApiController
    {
        private VideoRentalDb db = new VideoRentalDb();

        // GET: api/KhachHangs
        public IQueryable<KhachHang> GetKhachHangs()
        {
            return db.KhachHangs;
        }

        // GET: api/KhachHangs/5
        [ResponseType(typeof(KhachHang))]
        public async Task<IHttpActionResult> GetKhachHang(int id)
        {
            KhachHang khachHang = await db.KhachHangs.FindAsync(id);
            if (khachHang == null)
            {
                return NotFound();
            }

            return Ok(khachHang);
        }

        // PUT: api/KhachHangs/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutKhachHang(int id, KhachHang khachHang)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != khachHang.MaKhachHang)
            {
                return BadRequest();
            }

            db.Entry(khachHang).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KhachHangExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/KhachHangs
        [ResponseType(typeof(KhachHang))]
        public async Task<IHttpActionResult> PostKhachHang(KhachHang khachHang)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.KhachHangs.Add(khachHang);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = khachHang.MaKhachHang }, khachHang);
        }

        // DELETE: api/KhachHangs/5
        [ResponseType(typeof(KhachHang))]
        public async Task<IHttpActionResult> DeleteKhachHang(int id)
        {
            KhachHang khachHang = await db.KhachHangs.FindAsync(id);
            if (khachHang == null)
            {
                return NotFound();
            }

            db.KhachHangs.Remove(khachHang);
            await db.SaveChangesAsync();

            return Ok(khachHang);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool KhachHangExists(int id)
        {
            return db.KhachHangs.Count(e => e.MaKhachHang == id) > 0;
        }
    }
}