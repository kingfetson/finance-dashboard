// ============================================
// MAIN APPLICATION LOGIC
// ============================================

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

let currentTransactionType = 'expense';
let editingId = null;

// Theme Management
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    elements.themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    if (typeof updateCharts === 'function') {
        setTimeout(updateCharts, 100);
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    elements.themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
}

// Toast Notifications
function showToast(message, type = 'success') {
    const toast = elements.toast;
    toast.textContent = message;
    toast.className = 'toast ' + type;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// Formatting Helpers
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

// Update Dashboard
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
    
    if (typeof updateCharts === 'function') {
        setTimeout(updateCharts, 100);
    }
}

// Render Transactions
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

// Delete Transaction
window.deleteTransaction = function(id) {
    if (confirm('Are you sure you want to delete this transaction?')) {
        FinanceDB.deleteTransaction(id);
        updateDashboard();
        showToast('Transaction deleted successfully', 'error');
    }
};

// Open/Close Modal
function openModal(transaction = null) {
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
        elements.transactionForm.reset();
        elements.transactionDate.value = new Date().toISOString().split('T')[0];
        currentTransactionType = 'expense';
        editingId = null;
        updateTypeButtons('expense');
    }
    elements.transactionModal.classList.add('active');
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

// Form Submission
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
    
    const transaction = { description, amount, category, type: currentTransactionType, date };
    
    if (editingId) {
        const index = FinanceDB.transactions.findIndex(t => t.id === editingId);
        if (index !== -1) {
            FinanceDB.transactions[index] = { ...transaction, id: editingId };
            FinanceDB.saveToStorage();
            showToast('Transaction updated successfully', 'success');
        }
    } else {
        FinanceDB.addTransaction(transaction);
        showToast('Transaction added successfully', 'success');
    }
    
    closeModal();
    updateDashboard();
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    elements.currentDate.textContent = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    elements.transactionDate.value = new Date().toISOString().split('T')[0];
    loadTheme();
    updateDashboard();
});

// Event Listeners
elements.themeToggle.addEventListener('click', toggleTheme);
elements.addTransactionBtn.addEventListener('click', () => openModal());
elements.closeModal.addEventListener('click', closeModal);
elements.transactionModal.addEventListener('click', (e) => {
    if (e.target === elements.transactionModal) closeModal();
});
elements.transactionForm.addEventListener('submit', handleFormSubmit);
elements.typeExpense.addEventListener('click', () => updateTypeButtons('expense'));
elements.typeIncome.addEventListener('click', () => updateTypeButtons('income'));
elements.searchInput.addEventListener('input', renderTransactions);
elements.filterType.addEventListener('change', renderTransactions);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        openModal();
    }
});

// Expose functions
window.openModal = openModal;
window.closeModal = closeModal;
window.toggleTheme = toggleTheme;
window.updateDashboard = updateDashboard;
