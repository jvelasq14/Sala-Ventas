import { pool } from "../db.js";

export const getSalaProductos = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM sala_productos sp INNER JOIN productos p ON sp.id_productos = p.id_producto INNER JOIN sala_ventas sv ON sp.id_sala = sv.id WHERE sp.estado = ?",[
      id
    ]);
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getSalaProductosById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM sala_productos WHERE id_sala_producto = ?", [
      id,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};


export const createSalaProductos = async (req, res) => {
  try {
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