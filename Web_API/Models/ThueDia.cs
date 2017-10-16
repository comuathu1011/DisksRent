namespace Web_API.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ThueDia")]
    public partial class ThueDia
    {
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int MaDia { get; set; }

        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int MaKhachHang { get; set; }

        [Key]
        [Column(Order = 2, TypeName = "date")]
        public DateTime NgayThue { get; set; }

        [Column(TypeName = "date")]
        public DateTime? NgayTra { get; set; }

        public decimal? PhiTre { get; set; }

        public bool? DaThanhToan { get; set; }

        public virtual Dia Dia { get; set; }

        public virtual KhachHang KhachHang { get; set; }
    }
}
