const API_URL = "http://localhost:3000/api/items"; // change if backend is deployed

// ✅ Create
export async function createItem(item) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
    });
    return res.json();
}

// ✅ Get all
export async function getAllItems() {
    const res = await fetch(API_URL);
    return res.json();
}

// ✅ Get one
export async function getItemById(id) {
    const res = await fetch(`${API_URL}/${id}`);
    return res.json();
}

// ✅ Update
export async function updateItem(id, updates) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
    });
    return res.json();
}

// ✅ Delete
export async function deleteItem(id) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
    return res.json();
}
