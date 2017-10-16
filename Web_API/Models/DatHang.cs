namespace Web_API.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("DatHang")]
    public partial class DatHang
    {
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int MaKhachHang { get; set; }

        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int MaTieuDe { get; set; }

        public int? ThuTu { get; set; }

        public virtual KhachHang KhachHang { get; set; }

        public virtual TieuDe TieuDe { get; set; }
    }
}
