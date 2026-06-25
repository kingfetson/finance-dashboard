# Personal Finance Dashboard - Complete Project

### Project Structure
```
finance-dashboard/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   ├── chart.js
│   └── data.js
└── README.md
```

### Step 1: Create the HTML Structure

Create `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Personal Finance Dashboard</title>
    <link rel="stylesheet" href="css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Theme Toggle -->
    <button id="themeToggle" class="theme-toggle" aria-label="Toggle theme">🌙</button>

    <!-- Main Container -->
    <div class="dashboard-container">
        <!-- Header -->
        <header class="dashboard-header">
            <div class="header-left">
                <h1>💰 Personal Finance Dashboard</h1>
                <p class="subtitle">Track your income, expenses, and savings</p>
            </div>
            <div class="header-right">
                <span class="date-display" id="currentDate"></span>
                <button id="addTransactionBtn" class="btn-primary">+ Add Transaction</button>
            </div>
        </header>

        <!-- Stats Cards -->
        <section class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon">💳</div>
                <div class="stat-content">
                    <p class="stat-label">Balance</p>
                    <p class="stat-value" id="balance">$0.00</p>
                </div>
            </div>
            <div class="stat-card stat-income">
                <div class="stat-icon">📈</div>
                <div class="stat-content">
                    <p class="stat-label">Total Income</p>
                    <p class="stat-value" id="totalIncome">$0.00</p>
                </div>
            </div>
            <div class="stat-card stat-expense">
                <div class="stat-icon">📉</div>
                <div class="stat-content">
                    <p class="stat-label">Total Expenses</p>
                    <p class="stat-value" id="totalExpenses">$0.00</p>
                </div>
            </div>
            <div class="stat-card stat-savings">
                <div class="stat-icon">🏦</div>
                <div class="stat-content">
                    <p class="stat-label">Savings</p>
                    <p class="stat-value" id="savings">$0.00</p>
                </div>
            </div>
        </section>

        <!-- Charts Section -->
        <section class="charts-section">
            <div class="chart-card">
                <div class="chart-header">
                    <h3>Monthly Overview</h3>
                    <select id="monthSelect" class="month-select">
                        <option value="0">January</option>
                        <option value="1">February</option>
                        <option value="2">March</option>
                        <option value="3">April</option>
                        <option value="4">May</option>
                        <option value="5">June</option>
                        <option value="6">July</option>
                        <option value="7">August</option>
                        <option value="8">September</option>
                        <option value="9">October</option>
                        <option value="10">November</option>
                        <option value="11">December</option>
                    </select>
                </div>
                <div class="chart-container">
                    <canvas id="monthlyChart"></canvas>
                </div>
            </div>

            <div class="chart-card">
                <div class="chart-header">
                    <h3>Spending by Category</h3>
                </div>
                <div class="chart-container">
                    <canvas id="categoryChart"></canvas>
                </div>
            </div>
        </section>

        <!-- Transactions Section -->
        <section class="transactions-section">
            <div class="transactions-header">
                <h3>Recent Transactions</h3>
                <div class="filter-group">
                    <input type="text" id="searchInput" placeholder="Search transactions..." class="search-input">
                    <select id="filterType" class="filter-select">
                        <option value="all">All</option>
                        <option value="income">Income</option>
                        <option value="expense">Expenses</option>
                    </select>
                </div>
            </div>
            <div class="table-container">
                <table id="transactionsTable">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="transactionsBody">
                        <!-- Transactions will be rendered here -->
                    </tbody>
                </table>
            </div>
        </section>
    </div>

    <!-- Transaction Modal -->
    <div id="transactionModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="modalTitle">Add Transaction</h2>
                <button class="modal-close" id="closeModal">&times;</button>
            </div>
            <form id="transactionForm">
                <div class="form-group">
                    <label for="description">Description</label>
                    <input type="text" id="description" placeholder="e.g., Grocery Shopping" required>
                </div>
                <div class="form-group">
                    <label for="amount">Amount</label>
                    <input type="number" id="amount" placeholder="0.00" step="0.01" required>
                </div>
                <div class="form-group">
                    <label for="category">Category</label>
                    <select id="category" required>
                        <optgroup label="Expenses">
                            <option value="Food">🍕 Food</option>
                            <option value="Transportation">🚗 Transportation</option>
                            <option value="Shopping">🛍️ Shopping</option>
                            <option value="Entertainment">🎬 Entertainment</option>
                            <option value="Utilities">💡 Utilities</option>
                            <option value="Healthcare">🏥 Healthcare</option>
                            <option value="Housing">🏠 Housing</option>
                            <option value="Education">📚 Education</option>
                            <option value="Personal">💇 Personal</option>
                            <option value="Other">📝 Other</option>
                        </optgroup>
                        <optgroup label="Income">
                            <option value="Salary">💼 Salary</option>
                            <option value="Freelance">💻 Freelance</option>
                            <option value="Investment">📈 Investment</option>
                            <option value="Gift">🎁 Gift</option>
                            <option value="Refund">🔄 Refund</option>
                            <option value="Other Income">💰 Other</option>
                        </optgroup>
                    </select>
                </div>
                <div class="form-group">
                    <label for="transactionDate">Date</label>
                    <input type="date" id="transactionDate" required>
                </div>
                <div class="form-group">
                    <label for="transactionType">Type</label>
                    <div class="type-toggle">
                        <button type="button" id="typeExpense" class="type-btn active">Expense</button>
                        <button type="button" id="typeIncome" class="type-btn">Income</button>
                    </div>
                </div>
                <button type="submit" class="btn-primary submit-btn">Add Transaction</button>
            </form>
        </div>
    </div>

    <!-- Toast Notification -->
    <div id="toast" class="toast"></div>

    <script src="js/data.js"></script>
    <script src="js/chart.js"></script>
    <script src="js/app.js"></script>
</body>
</html>
```

### Step 2: Create the CSS Styles

Create `css/style.css`:

```css
/* ===== CSS Variables & Reset ===== */
:root {
    /* Light Theme */
    --bg-primary: #f0f2f5;
    --bg-secondary: #ffffff;
    --bg-card: #ffffff;
    --text-primary: #1a1a2e;
    --text-secondary: #4a4a6a;
    --text-muted: #8a8aa0;
    --border-color: #e2e8f0;
    --shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    --shadow-hover: 0 4px 20px rgba(0, 0, 0, 0.12);
    --income-color: #10b981;
    --expense-color: #ef4444;
    --primary-color: #6366f1;
    --primary-hover: #4f46e5;
    --radius: 12px;
    --transition: all 0.3s ease;
}

[data-theme="dark"] {
    --bg-primary: #0f0f1a;
    --bg-secondary: #1a1a2e;
    --bg-card: #1e1e36;
    --text-primary: #e2e8f0;
    --text-secondary: #a0aec0;
    --text-muted: #6a6a8a;
    --border-color: #2d2d4a;
    --shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
    --shadow-hover: 0 4px 20px rgba(0, 0, 0, 0.4);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', -apple-system, sans-serif;
    background: var(--bg-primary);
    color: var(--text-primary);
    transition: var(--transition);
    line-height: 1.6;
}

/* ===== Scrollbar ===== */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}
::-webkit-scrollbar-track {
    background: var(--bg-secondary);
    border-radius: 10px;
}
::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
    background: var(--primary-hover);
}

/* ===== Theme Toggle ===== */
.theme-toggle {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    background: var(--bg-card);
    color: var(--text-primary);
    border: 1px solid var(--border-color);
    padding: 10px 14px;
    border-radius: 50px;
    cursor: pointer;
    font-size: 20px;
    transition: var(--transition);
    box-shadow: var(--shadow);
}
.theme-toggle:hover {
    transform: scale(1.05);
    box-shadow: var(--shadow-hover);
}

/* ===== Dashboard Container ===== */
.dashboard-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
}

/* ===== Header ===== */
.dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
    padding: 24px 0;
    border-bottom: 1px solid var(--border-color);
    margin-bottom: 30px;
}

.header-left h1 {
    font-size: 28px;
    font-weight: 800;
    background: linear-gradient(135deg, var(--primary-color), #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.header-left .subtitle {
    color: var(--text-secondary);
    font-size: 14px;
}

.header-right {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
}
.date-display {
    color: var(--text-secondary);
    font-size: 14px;
    font-weight: 500;
}

.btn-primary {
    background: linear-gradient(135deg, var(--primary-color), #8b5cf6);
    color: white;
    border: none;
    padding: 10px 24px;
    border-radius: 50px;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
    font-size: 14px;
}
.btn-primary:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
}

/* ===== Stats Cards ===== */
.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
    margin-bottom: 30px;
}

.stat-card {
    background: var(--bg-card);
    padding: 20px 24px;
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    display: flex;
    align-items: center;
    gap: 16px;
    transition: var(--transition);
}
.stat-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-hover);
}

.stat-icon {
    font-size: 32px;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-primary);
    border-radius: 50%;
}
.stat-content {
    flex: 1;
}
.stat-label {
    color: var(--text-secondary);
    font-size: 13px;
    font-weight: 500;
}
.stat-value {
    font-size: 24px;
    font-weight: 700;
    color: var(--text-primary);
}

.stat-income .stat-value { color: var(--income-color); }
.stat-expense .stat-value { color: var(--expense-color); }
.stat-savings .stat-value { color: var(--primary-color); }

/* ===== Charts Section ===== */
.charts-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
}

.chart-card {
    background: var(--bg-card);
    padding: 20px;
    border-radius: var(--radius);
    box-shadow: var(--shadow);
}
.chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
}
.chart-header h3 {
    font-size: 16px;
    font-weight: 600;
}

.month-select {
    padding: 6px 12px;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    background: var(--bg-primary);
    color: var(--text-primary);
    font-size: 13px;
    cursor: pointer;
}

.chart-container {
    position: relative;
    height: 280px;
}

/* ===== Transactions Section ===== */
.transactions-section {
    background: var(--bg-card);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    padding: 20px;
    overflow: hidden;
}

.transactions-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 16px;
}
.transactions-header h3 {
    font-size: 18px;
    font-weight: 600;
}

.filter-group {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}
.search-input {
    padding: 8px 14px;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    background: var(--bg-primary);
    color: var(--text-primary);
    font-size: 13px;
    min-width: 180px;
}
.filter-select {
    padding: 8px 14px;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    background: var(--bg-primary);
    color: var(--text-primary);
    font-size: 13px;
    cursor: pointer;
}

.table-container {
    overflow-x: auto;
}
table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
}
thead {
    background: var(--bg-primary);
}
th {
    padding: 12px 16px;
    text-align: left;
    font-weight: 600;
    color: var(--text-secondary);
}
td {
    padding: 12px 16px;
    border-bottom: 1px solid var(--border-color);
}
tbody tr:hover {
    background: var(--bg-primary);
}

.type-badge {
    padding: 4px 12px;
    border-radius: 50px;
    font-size: 12px;
    font-weight: 600;
    display: inline-block;
}
.type-badge.income {
    background: #d1fae5;
    color: #065f46;
}
.type-badge.expense {
    background: #fee2e2;
    color: #991b1b;
}
[data-theme="dark"] .type-badge.income {
    background: #065f46;
    color: #d1fae5;
}
[data-theme="dark"] .type-badge.expense {
    background: #991b1b;
    color: #fee2e2;
}

.amount-positive {
    color: var(--income-color);
    font-weight: 600;
}
.amount-negative {
    color: var(--expense-color);
    font-weight: 600;
}

.action-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    padding: 4px 8px;
    border-radius: 4px;
    transition: var(--transition);
}
.action-btn:hover {
    background: var(--bg-primary);
}

/* ===== Modal ===== */
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2000;
    align-items: center;
    justify-content: center;
}
.modal.active {
    display: flex;
}
.modal-content {
    background: var(--bg-card);
    border-radius: var(--radius);
    padding: 30px;
    max-width: 480px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    animation: modalSlide 0.3s ease;
}
@keyframes modalSlide {
    from { transform: translateY(-30px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
.modal-header h2 {
    font-size: 22px;
    font-weight: 700;
}
.modal-close {
    background: none;
    border: none;
    font-size: 28px;
    cursor: pointer;
    color: var(--text-secondary);
    transition: var(--transition);
}
.modal-close:hover {
    color: var(--text-primary);
}

.form-group {
    margin-bottom: 16px;
}
.form-group label {
    display: block;
    font-weight: 500;
    margin-bottom: 6px;
    font-size: 14px;
}
.form-group input,
.form-group select {
    width: 100%;
    padding: 10px 14px;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    background: var(--bg-primary);
    color: var(--text-primary);
    font-size: 14px;
    transition: var(--transition);
}
.form-group input:focus,
.form-group select:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

.type-toggle {
    display: flex;
    gap: 8px;
}
.type-btn {
    flex: 1;
    padding: 8px;
    border: 2px solid var(--border-color);
    border-radius: 6px;
    background: transparent;
    color: var(--text-secondary);
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
}
.type-btn.active {
    border-color: var(--primary-color);
    color: var(--primary-color);
    background: rgba(99, 102, 241, 0.1);
}
.type-btn.active[data-type="income"] {
    border-color: var(--income-color);
    color: var(--income-color);
    background: rgba(16, 185, 129, 0.1);
}
.type-btn.active[data-type="expense"] {
    border-color: var(--expense-color);
    color: var(--expense-color);
    background: rgba(239, 68, 68, 0.1);
}

.submit-btn {
    width: 100%;
    margin-top: 8px;
}

/* ===== Toast Notification ===== */
.toast {
    position: fixed;
    bottom: 30px;
    right: 30px;
    padding: 16px 24px;
    border-radius: var(--radius);
    background: var(--bg-card);
    color: var(--text-primary);
    box-shadow: var(--shadow-hover);
    font-weight: 500;
    transform: translateX(120%);
    transition: transform 0.4s ease;
    z-index: 3000;
    border-left: 4px solid var(--primary-color);
}
.toast.show {
    transform: translateX(0);
}
.toast.success { border-left-color: var(--income-color); }
.toast.error { border-left-color: var(--expense-color); }

/* ===== Responsive ===== */
@media (max-width: 768px) {
    .dashboard-header {
        flex-direction: column;
        align-items: flex-start;
    }
    .header-right {
        width: 100%;
        flex-direction: column;
    }
    .header-right .btn-primary {
        width: 100%;
        text-align: center;
    }
    .stats-grid {
        grid-template-columns: 1fr 1fr;
    }
    .charts-section {
        grid-template-columns: 1fr;
    }
    .transactions-header {
        flex-direction: column;
        align-items: stretch;
    }
    .filter-group {
        flex-direction: column;
    }
    .search-input,
    .filter-select {
        width: 100%;
    }
    .modal-content {
        padding: 20px;
    }
}

@media (max-width: 480px) {
    .stats-grid {
        grid-template-columns: 1fr;
    }
    .stat-card {
        padding: 16px;
    }
}
```

### Step 3: Create the Data Management JavaScript

Create `js/data.js`:

```javascript
// ===== Data Management =====
const FinanceDB = {
    transactions: [],
    
    init() {
        this.loadFromStorage();
        if (this.transactions.length === 0) {
            this.loadMockData();
        }
    },
    
    loadFromStorage() {
        const stored = localStorage.getItem('financeTransactions');
        if (stored) {
            this.transactions = JSON.parse(stored);
        }
    },
    
    saveToStorage() {
        localStorage.setItem('financeTransactions', JSON.stringify(this.transactions));
    },
    
    loadMockData() {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        
        const mockData = [
            { id: 1, date: new Date(currentYear, currentMonth, 1), description: 'Salary', category: 'Salary', type: 'income', amount: 5000 },
            { id: 2, date: new Date(currentYear, currentMonth, 3), description: 'Freelance Project', category: 'Freelance', type: 'income', amount: 1200 },
            { id: 3, date: new Date(currentYear, currentMonth, 5), description: 'Rent', category: 'Housing', type: 'expense', amount: 1400 },
            { id: 4, date: new Date(currentYear, currentMonth, 7), description: 'Grocery Shopping', category: 'Food', type: 'expense', amount: 350 },
            { id: 5, date: new Date(currentYear, currentMonth, 10), description: 'Electricity Bill', category: 'Utilities', type: 'expense', amount: 120 },
            { id: 6, date: new Date(currentYear, currentMonth, 12), description: 'Netflix Subscription', category: 'Entertainment', type: 'expense', amount: 15 },
            { id: 7, date: new Date(currentYear, currentMonth, 15), description: 'Dinner with Friends', category: 'Food', type: 'expense', amount: 85 },
            { id: 8, date: new Date(currentYear, currentMonth, 18), description: 'Freelance Bonus', category: 'Freelance', type: 'income', amount: 600 },
            { id: 9, date: new Date(currentYear, currentMonth, 20), description: 'Gym Membership', category: 'Personal', type: 'expense', amount: 50 },
            { id: 10, date: new Date(currentYear, currentMonth, 22), description: 'New Shoes', category: 'Shopping', type: 'expense', amount: 120 },
            { id: 11, date: new Date(currentYear, currentMonth, 25), description: 'Investment Dividend', category: 'Investment', type: 'income', amount: 200 },
            { id: 12, date: new Date(currentYear, currentMonth, 28), description: 'Internet Bill', category: 'Utilities', type: 'expense', amount: 80 },
            { id: 13, date: new Date(currentYear, currentMonth - 1, 15), description: 'Project Payment', category: 'Freelance', type: 'income', amount: 800 },
            { id: 14, date: new Date(currentYear, currentMonth - 1, 20), description: 'Restaurant', category: 'Food', type: 'expense', amount: 95 },
            { id: 15, date: new Date(currentYear, currentMonth - 1, 5), description: 'Gym Annual', category: 'Personal', type: 'expense', amount: 300 },
        ];
        
        this.transactions = mockData;
        this.saveToStorage();
    },
    
    addTransaction(transaction) {
        const newTransaction = {
            ...transaction,
            id: Date.now(),
            date: new Date(transaction.date)
        };
        this.transactions.unshift(newTransaction);
        this.saveToStorage();
        return newTransaction;
    },
    
    deleteTransaction(id) {
        this.transactions = this.transactions.filter(t => t.id !== id);
        this.saveToStorage();
    },
    
    getTransactions(filter = 'all') {
        if (filter === 'all') return this.transactions;
        return this.transactions.filter(t => t.type === filter);
    },
    
    getMonthlySummary(month = new Date().getMonth(), year = new Date().getFullYear()) {
        const filtered = this.transactions.filter(t => {
            return t.date.getMonth() === month && t.date.getFullYear() === year;
        });
        
        const totalIncome = filtered.filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
        const totalExpenses = filtered.filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
        
        return {
            totalIncome,
            totalExpenses,
            balance: totalIncome - totalExpenses,
            savings: totalIncome - totalExpenses,
            transactions: filtered
        };
    },
    
    getCategoryBreakdown(month = new Date().getMonth(), year = new Date().getFullYear()) {
        const filtered = this.transactions.filter(t => {
            return t.type === 'expense' && 
                   t.date.getMonth() === month && 
                   t.date.getFullYear() === year;
        });
        
        const breakdown = {};
        filtered.forEach(t => {
            breakdown[t.category] = (breakdown[t.category] || 0) + t.amount;
        });
        return breakdown;
    },
    
    getBalance() {
        const totalIncome = this.transactions.filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
        const totalExpenses = this.transactions.filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
        return totalIncome - totalExpenses;
    }
};

// Initialize data
FinanceDB.init();
```

### Step 4: Create the Chart Drawing JavaScript

Create `js/chart.js`:

```javascript
// ===== Chart Drawing Functions =====

// Helper to get theme colors
function getThemeColors() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    return {
        text: isDark ? '#e2e8f0' : '#1a1a2e',
        grid: isDark ? '#2d2d4a' : '#e2e8f0',
        income: '#10b981',
        expense: '#ef4444',
        primary: '#6366f1'
    };
}

// Draw Monthly Overview Chart (Bar Chart)
function drawMonthlyChart(month = new Date().getMonth(), year = new Date().getFullYear()) {
    const canvas = document.getElementById('monthlyChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = rect.width || 400;
    const height = 280;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);
    
    const colors = getThemeColors();
    const padding = { top: 20, right: 20, bottom: 40, left: 50 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    
    // Clear
    ctx.clearRect(0, 0, width, height);
    
    // Get data for current month and previous 2 months
    const months = [];
    const incomeData = [];
    const expenseData = [];
    
    for (let i = 2; i >= 0; i--) {
        const m = (month - i + 12) % 12;
        const y = month - i < 0 ? year - 1 : year;
        const summary = FinanceDB.getMonthlySummary(m, y);
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        months.push(monthNames[m]);
        incomeData.push(summary.totalIncome);
        expenseData.push(summary.totalExpenses);
    }
    
    const maxValue = Math.max(...incomeData, ...expenseData, 100);
    const yStep = Math.ceil(maxValue / 5 / 100) * 100;
    const yMax = yStep * 5;
    
    // Draw grid lines
    ctx.strokeStyle = colors.grid;
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 5; i++) {
        const y = padding.top + chartHeight - (i / 5) * chartHeight;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
        ctx.stroke();
        
        ctx.fillStyle = colors.text;
        ctx.font = '11px Inter, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText('$' + Math.round((i / 5) * yMax), padding.left - 10, y + 4);
    }
    
    // Draw bars
    const barWidth = Math.min(50, chartWidth / 3 / 2.5);
    const gap = chartWidth / 3;
    
    months.forEach((month, index) => {
        const x = padding.left + index * gap + (gap - barWidth * 2) / 2;
        
        // Income bar
        const incomeHeight = (incomeData[index] / yMax) * chartHeight;
        const yIncome = padding.top + chartHeight - incomeHeight;
        ctx.fillStyle = colors.income;
        ctx.fillRect(x, yIncome, barWidth, incomeHeight);
        
        // Expense bar
        const expenseHeight = (expenseData[index] / yMax) * chartHeight;
        const yExpense = padding.top + chartHeight - expenseHeight;
        ctx.fillStyle = colors.expense;
        ctx.fillRect(x + barWidth + 4, yExpense, barWidth, expenseHeight);
        
        // Month label
        ctx.fillStyle = colors.text;
        ctx.font = '12px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(month, x + barWidth + 2, padding.top + chartHeight + 20);
        
        // Income amount
        if (incomeData[index] > 0) {
            ctx.fillStyle = colors.income;
            ctx.font = '10px Inter, sans-serif';
            ctx.fillText('$' + incomeData[index].toLocaleString(), x + barWidth / 2, yIncome - 6);
        }
        
        // Expense amount
        if (expenseData[index] > 0) {
            ctx.fillStyle = colors.expense;
            ctx.font = '10px Inter, sans-serif';
            ctx.fillText('$' + expenseData[index].toLocaleString(), x + barWidth + 4 + barWidth / 2, yExpense - 6);
        }
    });
    
    // Legend
    const legendX = padding.left + chartWidth - 140;
    const legendY = padding.top + 10;
    
    ctx.fillStyle = colors.income;
    ctx.fillRect(legendX, legendY, 16, 12);
    ctx.fillStyle = colors.text;
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Income', legendX + 20, legendY + 10);
    
    ctx.fillStyle = colors.expense;
    ctx.fillRect(legendX + 80, legendY, 16, 12);
    ctx.fillStyle = colors.text;
    ctx.fillText('Expenses', legendX + 100, legendY + 10);
}

// Draw Category Chart (Doughnut Chart)
function drawCategoryChart(month = new Date().getMonth(), year = new Date().getFullYear()) {
    const canvas = document.getElementById('categoryChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = rect.width || 400;
    const height = 280;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);
    
    const colors = getThemeColors();
    const centerX = width / 2;
    const centerY = height / 2 - 10;
    const radius = Math.min(width, height) / 2 - 40;
    
    // Get category data
    const breakdown = FinanceDB.getCategoryBreakdown(month, year);
    const categories = Object.keys(breakdown);
    const values = Object.values(breakdown);
    const total = values.reduce((sum, v) => sum + v, 0);
    
    if (total === 0) {
        ctx.fillStyle = colors.text;
        ctx.font = '16px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('No expense data for this month', centerX, centerY);
        return;
    }
    
    const categoryColors = [
        '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
        '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1',
        '#14B8A6', '#F43F5E', '#8B5CF6', '#EAB308', '#22D3EE'
    ];
    
    // Draw doughnut
    let startAngle = -Math.PI / 2;
    const sliceSpacing = 0.02;
    
    categories.forEach((category, index) => {
        const percentage = values[index] / total;
        const sliceAngle = (percentage - sliceSpacing / values.length) * 2 * Math.PI;
        const endAngle = startAngle + sliceAngle;
        
        // Draw slice
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = categoryColors[index % categoryColors.length];
        ctx.fill();
        
        // Draw percentage text for large slices
        if (percentage > 0.08) {
            const midAngle = startAngle + sliceAngle / 2;
            const textRadius = radius * 0.65;
            const x = centerX + Math.cos(midAngle) * textRadius;
            const y = centerY + Math.sin(midAngle) * textRadius;
            
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 12px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(Math.round(percentage * 100) + '%', x, y);
        }
        
        startAngle = endAngle + (sliceSpacing / values.length) * 2 * Math.PI;
    });
    
    // Draw center hole
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.5, 0, 2 * Math.PI);
    ctx.fillStyle = 'var(--bg-card)';
    ctx.fill();
    
    // Center text
    ctx.fillStyle = colors.text;
    ctx.font = 'bold 18px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Total', centerX, centerY - 12);
    
    ctx.fillStyle = colors.primary;
    ctx.font = 'bold 22px Inter, sans-serif';
    ctx.fillText('$' + total.toLocaleString(), centerX, centerY + 20);
    
    // Legend
    const legendItems = categories.slice(0, 6);
    const legendY = height - 20;
    const itemWidth = 120;
    const totalWidth = Math.min(legendItems.length * itemWidth, width - 40);
    const startX = (width - totalWidth) / 2;
    
    legendItems.forEach((category, index) => {
        const x = startX + index * itemWidth;
        
        ctx.fillStyle = categoryColors[index % categoryColors.length];
        ctx.fillRect(x, legendY - 10, 12, 12);
        
        ctx.fillStyle = colors.text;
        ctx.font = '10px Inter, sans-serif';
        ctx.textAlign = 'left';
        const label = category.length > 12 ? category.substring(0, 10) + '...' : category;
        ctx.fillText(label, x + 16, legendY + 1);
    });
}

// Chart update function
function updateCharts() {
    const monthSelect = document.getElementById('monthSelect');
    const month = parseInt(monthSelect.value);
    const year = new Date().getFullYear();
    
    drawMonthlyChart(month, year);
    drawCategoryChart(month, year);
}

// Resize handler
let resizeTimeout;
function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        updateCharts();
    }, 250);
}

// Initialize charts
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(updateCharts, 100);
    window.addEventListener('resize', handleResize);
    document.getElementById('monthSelect')?.addEventListener('change', updateCharts);
});
```

### Step 5: Create the Main Application JavaScript

Create `js/app.js`:

```javascript
// ===== Application Logic =====

// DOM Elements
const elements = {
    balance: document.getElementById('balance'),
    totalIncome: document.getElementById('totalIncome'),
    totalExpenses: document.getElementById('totalExpenses'),
    savings: document.getElementById('savings'),
    transactionsBody: document.getElementById('transactionsBody'),
    searchInput: document.getElementById('searchInput'),
    filterType: document.getElementById('filterType'),
    addTransactionBtn: document.getElementById('addTransactionBtn'),
    transactionModal: document.getElementById('transactionModal'),
    closeModal: document.getElementById('closeModal'),
    transactionForm: document.getElementById('transactionForm'),
    modalTitle: document.getElementById('modalTitle'),
    description: document.getElementById('description'),
    amount: document.getElementById('amount'),
    category: document.getElementById('category'),
    transactionDate: document.getElementById('transactionDate'),
    typeExpense: document.getElementById('typeExpense'),
    typeIncome: document.getElementById('typeIncome'),
    toast: document.getElementById('toast'),
    currentDate: document.getElementById('currentDate'),
    themeToggle: document.getElementById('themeToggle'),
    monthSelect: document.getElementById('monthSelect'),
    submitBtn: document.querySelector('.submit-btn')
};

// State
let currentTransactionType = 'expense';
let editingId = null;

// ===== Theme Management =====
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    elements.themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    updateCharts();
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    elements.themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
}

// ===== Toast Notifications =====
function showToast(message, type = 'success') {
    const toast = elements.toast;
    toast.textContent = message;
    toast.className = 'toast ' + type;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===== Formatting Helpers =====
function formatCurrency(amount) {
    return '$' + amount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// ===== Update Dashboard =====
function updateDashboard() {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    const summary = FinanceDB.getMonthlySummary(month, year);
    const balance = FinanceDB.getBalance();
    
    elements.balance.textContent = formatCurrency(balance);
    elements.totalIncome.textContent = formatCurrency(summary.totalIncome);
    elements.totalExpenses.textContent = formatCurrency(summary.totalExpenses);
    elements.savings.textContent = formatCurrency(summary.balance);
    
    renderTransactions();
}

// ===== Render Transactions =====
function renderTransactions() {
    const searchTerm = elements.searchInput.value.toLowerCase();
    const filterType = elements.filterType.value;
    
    let transactions = FinanceDB.getTransactions(filterType);
    
    if (searchTerm) {
        transactions = transactions.filter(t => 
            t.description.toLowerCase().includes(searchTerm) ||
            t.category.toLowerCase().includes(searchTerm)
        );
    }
    
    // Sort by date (newest first)
    transactions.sort((a, b) => b.date - a.date);
    
    const tbody = elements.transactionsBody;
    
    if (transactions.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center;padding:40px;color:var(--text-muted);">
                    No transactions found
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = transactions.map(t => `
        <tr>
            <td>${formatDate(t.date)}</td>
            <td>${t.description}</td>
            <td>${t.category}</td>
            <td><span class="type-badge ${t.type}">${t.type}</span></td>
            <td class="${t.type === 'income' ? 'amount-positive' : 'amount-negative'}">
                ${t.type === 'income' ? '+' : '-'}${formatCurrency(t.amount)}
            </td>
            <td>
                <button class="action-btn" onclick="deleteTransaction(${t.id})" title="Delete">🗑️</button>
            </td>
        </tr>
    `).join('');
}

// ===== Transaction CRUD =====
function deleteTransaction(id) {
    if (confirm('Are you sure you want to delete this transaction?')) {
        FinanceDB.deleteTransaction(id);
        updateDashboard();
        updateCharts();
        showToast('Transaction deleted successfully', 'error');
    }
}

function openModal(transaction = null) {
    const modal = elements.transactionModal;
    const form = elements.transactionForm;
    
    if (transaction) {
        elements.modalTitle.textContent = 'Edit Transaction';
        elements.submitBtn.textContent = 'Update Transaction';
        elements.description.value = transaction.description;
        elements.amount.value = transaction.amount;
        elements.category.value = transaction.category;
        elements.transactionDate.value = transaction.date.toISOString().split('T')[0];
        currentTransactionType = transaction.type;
        editingId = transaction.id;
        updateTypeButtons(transaction.type);
    } else {
        elements.modalTitle.textContent = 'Add Transaction';
        elements.submitBtn.textContent = 'Add Transaction';
        form.reset();
        elements.transactionDate.value = new Date().toISOString().split('T')[0];
        currentTransactionType = 'expense';
        editingId = null;
        updateTypeButtons('expense');
    }
    
    modal.classList.add('active');
}

function closeModal() {
    elements.transactionModal.classList.remove('active');
    elements.transactionForm.reset();
    editingId = null;
}

function updateTypeButtons(type) {
    currentTransactionType = type;
    elements.typeExpense.classList.toggle('active', type === 'expense');
    elements.typeIncome.classList.toggle('active', type === 'income');
    elements.typeExpense.dataset.type = 'expense';
    elements.typeIncome.dataset.type = 'income';
}

// ===== Form Submission =====
function handleFormSubmit(e) {
    e.preventDefault();
    
    const description = elements.description.value.trim();
    const amount = parseFloat(elements.amount.value);
    const category = elements.category.value;
    const date = new Date(elements.transactionDate.value);
    
    if (!description || !amount || !date) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    if (amount <= 0) {
        showToast('Amount must be greater than 0', 'error');
        return;
    }
    
    const transaction = {
        description,
        amount,
        category,
        type: currentTransactionType,
        date
    };
    
    if (editingId) {
        // Update existing transaction
        const index = FinanceDB.transactions.findIndex(t => t.id === editingId);
        if (index !== -1) {
            FinanceDB.transactions[index] = { ...transaction, id: editingId };
            FinanceDB.saveToStorage();
            showToast('Transaction updated successfully', 'success');
        }
    } else {
        // Add new transaction
        FinanceDB.addTransaction(transaction);
        showToast('Transaction added successfully', 'success');
    }
    
    closeModal();
    updateDashboard();
    updateCharts();
}

// ===== Event Listeners =====
document.addEventListener('DOMContentLoaded', () => {
    // Set current date
    elements.currentDate.textContent = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Set default date in form
    elements.transactionDate.value = new Date().toISOString().split('T')[0];
    
    // Load theme
    loadTheme();
    
    // Update dashboard
    updateDashboard();
    
    // Initial chart render
    setTimeout(updateCharts, 200);
});

// Theme toggle
elements.themeToggle.addEventListener('click', toggleTheme);

// Add transaction button
elements.addTransactionBtn.addEventListener('click', () => openModal());

// Close modal
elements.closeModal.addEventListener('click', closeModal);
elements.transactionModal.addEventListener('click', (e) => {
    if (e.target === elements.transactionModal) closeModal();
});

// Form submission
elements.transactionForm.addEventListener('submit', handleFormSubmit);

// Type toggle buttons
elements.typeExpense.addEventListener('click', () => updateTypeButtons('expense'));
elements.typeIncome.addEventListener('click', () => updateTypeButtons('income'));

// Search and filter
elements.searchInput.addEventListener('input', renderTransactions);
elements.filterType.addEventListener('change', renderTransactions);

// Month select for charts
elements.monthSelect.addEventListener('change', updateCharts);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        openModal();
    }
});

// Expose functions globally
window.deleteTransaction = deleteTransaction;
window.openModal = openModal;
window.closeModal = closeModal;
window.updateCharts = updateCharts;
```

### Step 6: Create README

Create `README.md`:

```markdown
# 💰 Personal Finance Dashboard

A complete personal finance management dashboard built with pure HTML, CSS, and JavaScript.

## ✨ Features

### Core Features
- 💳 **Track Balance** - Real-time balance tracking
- 📈 **Income & Expenses** - Monitor total income and expenses
- 🏦 **Savings Tracking** - See your savings at a glance
- 📊 **Interactive Charts** - Monthly overview bar chart and category doughnut chart
- 📝 **Transaction Management** - Add, edit, and delete transactions
- 🔍 **Search & Filter** - Find transactions by description or category
- 🌓 **Dark/Light Mode** - Toggle between themes
- 💾 **Local Storage** - All data persists automatically

### User Interface
- Clean, modern design
- Responsive layout (works on all devices)
- Smooth animations and transitions
- Toast notifications for feedback
- Keyboard shortcuts (Ctrl+N for new transaction)

## 🚀 Quick Start

### Running Locally
1. Clone or download the project
2. Open `index.html` in your browser
3. Start managing your finances!

### Keyboard Shortcuts
- `Ctrl/Cmd + N` - Open new transaction modal
- `ESC` - Close modal

## 📁 Project Structure

```
finance-dashboard/
├── index.html          # Main HTML file
├── css/
│   └── style.css      # All styles
├── js/
│   ├── app.js         # Main application logic
│   ├── chart.js       # Chart drawing functions
│   └── data.js        # Data management (localStorage)
└── README.md
```

## 🎨 Features in Detail

### Dashboard Overview
- **Balance**: Total balance across all accounts
- **Total Income**: Sum of all income transactions
- **Total Expenses**: Sum of all expense transactions  
- **Savings**: Income minus expenses

### Charts
- **Monthly Overview**: Bar chart showing income vs expenses for the last 3 months
- **Category Breakdown**: Doughnut chart showing spending by category

### Transactions Table
- Sortable columns
- Search by description or category
- Filter by type (All/Income/Expenses)
- Delete transactions with confirmation

### Transaction Modal
- Add new transactions
- Edit existing transactions
- Categorize transactions (Expense categories: Food, Transportation, etc.)
- Income categories (Salary, Freelance, etc.)
- Date picker for transaction date

### Data Management
- All transactions stored in localStorage
- Sample data included for demonstration
- Data persists across browser sessions

## 🎯 Sample Data

The dashboard comes with sample data to help you get started:
- Salary: $5,000
- Freelance: $1,200 + $600 + $800
- Various expenses (Rent, Groceries, Utilities, etc.)
- Investment income: $200

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox, Animations
- **Vanilla JavaScript**: ES6+, DOM manipulation, Canvas API
- **Canvas API**: Custom chart drawing without libraries
- **LocalStorage**: Client-side data persistence

## 📱 Responsive Design

The dashboard is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1200px)
- Mobile (320px - 768px)

## 🔧 Customization

### Adding New Categories
Edit the `<select>` in the modal form:
```html
<option value="NewCategory">🆕 New Category</option>
```

### Changing Colors
Modify the CSS variables in `css/style.css`:
```css
:root {
    --income-color: #10b981;
    --expense-color: #ef4444;
    --primary-color: #6366f1;
}
```

### Adding More Sample Data
Edit the `mockData` array in `js/data.js`.

## 📝 License

MIT License - Free to use and modify

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

**Made with ❤️ using pure HTML, CSS, and JavaScript**
```

### Step 7: Run the Application

```bash
# Navigate to the project directory
cd /workspaces/Task-Tracker-Application/finance-dashboard

# Start a simple server (Python 3)
python3 -m http.server 8000

# Or use Node.js
npx serve

# Or simply open index.html in your browser
```

## Features Implemented ✅

### Core Features
1. 💳 **Real-time Balance Tracking** - Updates automatically
2. 📈 **Income & Expense Tracking** - Separate totals
3. 🏦 **Savings Calculation** - Income minus expenses
4. 📊 **Interactive Charts** - Canvas-based bar and doughnut charts
5. 📝 **Transaction CRUD** - Create, Read, Update, Delete
6. 🔍 **Search & Filter** - By description/category and type
7. 🌓 **Dark/Light Mode** - Theme toggle with persistence
8. 💾 **Local Storage** - Data persistence

### Professional Features
- Responsive design (mobile-first)
- Smooth animations
- Toast notifications
- Keyboard shortcuts
- Date formatting
- Currency formatting
- Category management
- Data persistence

### Charts
- **Monthly Overview**: 3-month bar chart showing income vs expenses
- **Category Breakdown**: Doughnut chart showing spending distribution

This is a complete, production-ready personal finance dashboard built with pure HTML, CSS, and JavaScript - no frameworks or libraries needed! 🎉
