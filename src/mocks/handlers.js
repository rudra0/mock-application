import { rest } from 'msw';

// Initialize data if not in localStorage
const initialData = JSON.parse(localStorage.getItem('cards')) || [
  { type: 'bank-draft', title: 'Bank Draft', position: 0 },
  { type: 'bill-of-lading', title: 'Bill of Lading', position: 1 },
  { type: 'invoice', title: 'Invoice', position: 2 },
  { type: 'bank-draft-2', title: 'Bank Draft 2', position: 3 },
  { type: 'bill-of-lading-2', title: 'Bill of Lading 2', position: 4 }
];

if (!localStorage.getItem('cards')) {
  localStorage.setItem('cards', JSON.stringify(initialData));
}

export const handlers = [
  // Mock GET request to fetch the card data
  rest.get('/api/cards', (req, res, ctx) => {
    const data = JSON.parse(localStorage.getItem('cards')) || [];
    return res(ctx.status(200), ctx.json(data));
  }),

  // Mock POST request to add new card data
  rest.post('/api/cards', (req, res, ctx) => {
    const newCard = req.body;
    const data = JSON.parse(localStorage.getItem('cards')) || [];
    data.push(newCard);
    localStorage.setItem('cards', JSON.stringify(data));
    return res(ctx.status(201), ctx.json(data));
  }),

  // Mock PUT request to update existing card data
  rest.put('/api/cards', (req, res, ctx) => {
    const updatedData = req.body;
    localStorage.setItem('cards', JSON.stringify(updatedData));
    return res(ctx.status(200), ctx.json(updatedData));
  }),
];
