
    const { id_sala, id_productos, cantidad } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO sala_productos (id_sala, id_productos, estado, cantidad) VALUES (?, ?, 1, ?)",
      [ id_sala, id_productos, cantidad]
    );
    res.status(201).json({ id: rows.insertId, id_sala, id_productos, cantidad, estado: 1 });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};


export const updateSalaProductos = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_sala, id_productos,cantidad } = req.body;

    const [result] = await pool.query(
      "UPDATE sala_productos SET id_sala = ?, id_productos = ?, cantidad = ? WHERE id_sala_producto = ?",
      [ id_sala, id_productos,cantidad, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Employee not found", status: 404});

    const [rows] = await pool.query("SELECT * FROM sala_productos WHERE id_sala_producto = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong", status: 500 });
  }
};

export const CambioEstadoSP = async (req, res) => {
    try {
      const { id } = req.params;
      const { estado } = req.body;
  
      const [result] = await pool.query(
        "UPDATE sala_roductos SET  estado = ? WHERE id_sala_producto = ?",
        [estado, id]
      );
  
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Employee not found" });
  
      const [rows] = await pool.query("SELECT * FROM sala_productos WHERE id = ?", [
        id,
      ]);
  
      res.json(rows[0]);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };
