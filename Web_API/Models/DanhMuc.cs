namespace Web_API.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("DanhMuc")]
    public partial class DanhMuc
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public DanhMuc()
        {
            TieuDes = new HashSet<TieuDe>();
        }

        [Key]
        public int MaDanhMuc { get; set; }

        public string TenDanhMuc { get; set; }

        public decimal? GiaThue { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TieuDe> TieuDes { get; set; }
    }
}
