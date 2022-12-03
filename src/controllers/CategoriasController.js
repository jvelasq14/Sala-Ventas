import { pool } from "../db.js";

export const getCategorias = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM categorias WHERE estado = ?",[id]);
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getCategoriaById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM categorias WHERE categoria_id = ?", [
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


export const createCategorias = async (req, res) => {
  try {
    const { nombre_categoria,  estado } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO categorias (nombre_categoria,  estado) VALUES ( ?, 1)",
      [nombre_categoria]
    );
    res.status(201).json({ id: rows.insertId, nombre_categoria, estado: 1 });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updateCategorias = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre,  } = req.body;

    const [result] = await pool.query(
      "UPDATE categorias SET nombre = ?  WHERE categoria_id = ?",
      [nombre, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Employee not found", status: 404});

    const [rows] = await pool.query("SELECT * FROM categorias WHERE categoria_id = ?", [
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
        "UPDATE categorias SET  estado = ? WHERE categoria_id = ?",
        [estado, id]
      );
  
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Employee not found" });
  
      const [rows] = await pool.query("SELECT * FROM categorias WHERE categoria_id = ?", [
        id,
      ]);
  
      res.json(rows[0]);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };