import { pool } from "../db.js";

export const getProductos = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM productos p INNER JOIN categorias c ON p.id_categoria = c.categoria_id WHERE p.estado = ?",
    [id]);
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getProductosById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM productos WHERE id_producto = ?", [
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


export const createProductos = async (req, res) => {
  try {
    const { nombre, precio, id_categoria } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO productos (nombre, precio, id_categoria, estado) VALUES (?, ?, ?, 1)",
      [nombre, precio, id_categoria]
    );
    res.status(201).json({ id: rows.insertId, nombre, precio, id_categoria, estado: 1 });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updateProductos = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio,id_categoria } = req.body;

    const [result] = await pool.query(
      "UPDATE productos SET nombre = ?, precio = ?, id_categoria = ? WHERE id_producto = ?",
      [nombre, precio,id_categoria, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Employee not found", status: 404});

    const [rows] = await pool.query("SELECT * FROM productos WHERE id_producto = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong", status: 500 });
  }
};

export const CambioEstado = async (req, res) => {
    try {
      const { id } = req.params;
      const { estado } = req.body;
  
      const [result] = await pool.query(
        "UPDATE productos SET  estado = ? WHERE id_producto = ?",
        [estado, id]
      );
  
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Employee not found" });
  
      const [rows] = await pool.query("SELECT * FROM productos WHERE id_producto = ?", [
        id,
      ]);
  
      res.json(rows[0]);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };