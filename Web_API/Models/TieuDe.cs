namespace Web_API.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("TieuDe")]
    public partial class TieuDe
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public TieuDe()
        {
            Dias = new HashSet<Dia>();
            DatHangs = new HashSet<DatHang>();
        }

        [Key]
        public int MaTieuDe { get; set; }

        public string TenTieuDe { get; set; }

        public int? MaDanhMuc { get; set; }

        public virtual DanhMuc DanhMuc { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Dia> Dias { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DatHang> DatHangs { get; set; }
    }
}
