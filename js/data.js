// ============================================
// DATA MANAGEMENT
// ============================================
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
