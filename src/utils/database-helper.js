const { pool, executeQuery } = require('../config/database');

// Fungsi untuk insert data
const insertData = async (table, data) => {
  try {
    const columns = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const values = Object.values(data);
    
    const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
    const result = await executeQuery(query, values);
    return result;
  } catch (error) {
    console.error(`Error inserting data to ${table}:`, error);
    throw error;
  }
};

// Fungsi untuk select data
const selectData = async (table, conditions = {}, limit = null) => {
  try {
    let query = `SELECT * FROM ${table}`;
    let params = [];
    
    if (Object.keys(conditions).length > 0) {
      const whereClause = Object.keys(conditions).map(key => `${key} = ?`).join(' AND ');
      query += ` WHERE ${whereClause}`;
      params = Object.values(conditions);
    }
    
    if (limit) {
      query += ` LIMIT ${limit}`;
    }
    
    const result = await executeQuery(query, params);
    return result;
  } catch (error) {
    console.error(`Error selecting data from ${table}:`, error);
    throw error;
  }
};

// Fungsi untuk update data
const updateData = async (table, data, conditions) => {
  try {
    const setClause = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const whereClause = Object.keys(conditions).map(key => `${key} = ?`).join(' AND ');
    
    const query = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;
    const params = [...Object.values(data), ...Object.values(conditions)];
    
    const result = await executeQuery(query, params);
    return result;
  } catch (error) {
    console.error(`Error updating data in ${table}:`, error);
    throw error;
  }
};

// Fungsi untuk delete data
const deleteData = async (table, conditions) => {
  try {
    const whereClause = Object.keys(conditions).map(key => `${key} = ?`).join(' AND ');
    const query = `DELETE FROM ${table} WHERE ${whereClause}`;
    const params = Object.values(conditions);
    
    const result = await executeQuery(query, params);
    return result;
  } catch (error) {
    console.error(`Error deleting data from ${table}:`, error);
    throw error;
  }
};

module.exports = {
  insertData,
  selectData,
  updateData,
  deleteData
};
