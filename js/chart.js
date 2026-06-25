// ============================================
// CHART DRAWING FUNCTIONS
// ============================================

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
    
    // Set canvas size with device pixel ratio
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);
    
    const colors = getThemeColors();
    const padding = { top: 20, right: 20, bottom: 40, left: 50 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    
    // Clear canvas
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
    
    // Calculate Y-axis scale
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
        
        // Income amount label
        if (incomeData[index] > 0) {
            ctx.fillStyle = colors.income;
            ctx.font = '10px Inter, sans-serif';
            ctx.fillText('$' + incomeData[index].toLocaleString(), x + barWidth / 2, yIncome - 6);
        }
        
        // Expense amount label
        if (expenseData[index] > 0) {
            ctx.fillStyle = colors.expense;
            ctx.font = '10px Inter, sans-serif';
            ctx.fillText('$' + expenseData[index].toLocaleString(), x + barWidth + 4 + barWidth / 2, yExpense - 6);
        }
    });
    
    // Draw legend
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
    
    // Set canvas size with device pixel ratio
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
    
    // Show message if no data
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
    
    // Draw doughnut chart
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
        
        // Draw percentage label for larger slices
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
    
    // Draw legend
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

// Update both charts
function updateCharts() {
    const monthSelect = document.getElementById('monthSelect');
    const month = parseInt(monthSelect.value);
    const year = new Date().getFullYear();
    
    drawMonthlyChart(month, year);
    drawCategoryChart(month, year);
}

// Handle window resize
let resizeTimeout;
function handleChartResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        updateCharts();
    }, 250);
}

// Initialize charts when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(updateCharts, 200);
    window.addEventListener('resize', handleChartResize);
    document.getElementById('monthSelect')?.addEventListener('change', updateCharts);
});
