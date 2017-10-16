namespace Web_API.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Dia")]
    public partial class Dia
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Dia()
        {
            ThueDias = new HashSet<ThueDia>();
        }

        [Key]
        public int MaDia { get; set; }

        public int? TinhTrangThue { get; set; }

        public int? MaTieuDe { get; set; }

        public virtual TieuDe TieuDe { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ThueDia> ThueDias { get; set; }
    }
}
