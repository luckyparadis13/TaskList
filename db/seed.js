import db from "./client.js";
import bcrypt from "bcrypt";

const seed = async () => {
  const password = await bcrypt.hash("password123", 10);
  const {
    rows: [user],
  } = await db.query(
    `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`,
    ["luckyuser", password]
  );

  await db.query(
    `
    INSERT INTO tasks (user_id, title, done)
    VALUES
      ($1, 'Do laundry', false),
      ($1, 'Write code', true),
      ($1, 'Take a break', false)
  `,
    [user.id]
  );

  console.log("✅ Database seeded");
  db.end();
};

seed();
