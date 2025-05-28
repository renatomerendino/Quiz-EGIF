// Quiz Application Logic
class QuizApp {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.isAnswered = false;
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // File input handling
        const fileInput = document.getElementById('file-input');
        const uploadArea = document.getElementById('upload-area');
        const startQuizBtn = document.getElementById('start-quiz-btn');
        const nextBtn = document.getElementById('next-btn');
        const restartBtn = document.getElementById('restart-btn');
        const newQuizBtn = document.getElementById('new-quiz-btn');

        // File upload events
        fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
        
        // Drag and drop events
        uploadArea.addEventListener('dragover', (e) => this.handleDragOver(e));
        uploadArea.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        uploadArea.addEventListener('drop', (e) => this.handleFileDrop(e));
        uploadArea.addEventListener('click', () => fileInput.click());

        // Button events
        startQuizBtn.addEventListener('click', () => this.startQuiz());
        nextBtn.addEventListener('click', () => this.nextQuestion());
        restartBtn.addEventListener('click', () => this.restartQuiz());
        newQuizBtn.addEventListener('click', () => this.loadNewQuiz());
    }

    handleDragOver(e) {
        e.preventDefault();
        e.currentTarget.classList.add('dragover');
    }

    handleDragLeave(e) {
        e.currentTarget.classList.remove('dragover');
    }

    handleFileDrop(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            this.processFile(files[0]);
        }
    }

    handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            this.processFile(file);
        }
    }

    async processFile(file) {
        if (!file.type.includes('json')) {
            this.showError('Per favore, seleziona un file JSON valido.');
            return;
        }

        try {
            const text = await this.readFileAsText(file);
            const data = JSON.parse(text);
            
            if (this.validateQuizData(data)) {
                this.questions = data.questions;
                this.showFileInfo(file.name);
            } else {
                this.showError('Il file JSON non ha la struttura corretta per il quiz.');
            }
        } catch (error) {
            this.showError('Errore nella lettura del file JSON. Verifica che sia un file valido.');
        }
    }

    readFileAsText(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(e);
            reader.readAsText(file);
        });
    }

    validateQuizData(data) {
        if (!data.questions || !Array.isArray(data.questions)) {
            return false;
        }

        return data.questions.every(question => 
            question.id && 
            question.question_text && 
            question.options && 
            Array.isArray(question.options) && 
            question.options.length === 4 &&
            question.correct_option_id &&
            question.explanation &&
            question.options.every(option => option.id && option.text)
        );
    }

    showFileInfo(fileName) {
        const fileInfo = document.getElementById('file-info');
        const fileNameElement = document.getElementById('file-name');
        
        fileNameElement.textContent = `File caricato: ${fileName} (${this.questions.length} domande)`;
        fileInfo.style.display = 'block';
    }

    showError(message) {
        alert(message); // In a production app, you'd use a more elegant error display
    }

    startQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.isAnswered = false;

        document.getElementById('upload-section').style.display = 'none';
        document.getElementById('quiz-section').style.display = 'block';
        
        this.displayQuestion();
    }

    displayQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        
        // Update progress
        this.updateProgress();
        
        // Update question content
        document.getElementById('question-number').textContent = `Domanda ${this.currentQuestionIndex + 1}`;
        document.getElementById('question-text').textContent = question.question_text;
        
        // Create options
        this.createOptions(question);
        
        // Hide feedback section
        document.getElementById('feedback-section').style.display = 'none';
        this.isAnswered = false;
    }

    updateProgress() {
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');
        
        const progressPercentage = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        progressFill.style.width = `${progressPercentage}%`;
        progressText.textContent = `${this.currentQuestionIndex + 1} / ${this.questions.length}`;
    }

    createOptions(question) {
        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';

        question.options.forEach(option => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.onclick = () => this.selectOption(option.id, optionElement);
            
            optionElement.innerHTML = `
                <div class="option-id">${option.id}</div>
                <div class="option-text">${option.text}</div>
            `;
            
            optionsContainer.appendChild(optionElement);
        });
    }

    selectOption(selectedId, selectedElement) {
        if (this.isAnswered) return;

        const question = this.questions[this.currentQuestionIndex];
        const allOptions = document.querySelectorAll('.option');
        
        // Disable all options
        allOptions.forEach(option => {
            option.classList.add('disabled');
            option.onclick = null;
        });

        // Mark correct and incorrect answers
        allOptions.forEach(option => {
            const optionId = option.querySelector('.option-id').textContent;
            
            if (optionId === question.correct_option_id) {
                option.classList.add('correct');
            } else if (optionId === selectedId) {
                option.classList.add('incorrect');
            }
        });

        // Check if answer is correct
        const isCorrect = selectedId === question.correct_option_id;
        if (isCorrect) {
            this.score++;
        }

        // Store user answer
        this.userAnswers.push({
            questionId: question.id,
            selectedOption: selectedId,
            correctOption: question.correct_option_id,
            isCorrect: isCorrect
        });

        // Show feedback
        this.showFeedback(isCorrect, question.explanation);
        this.isAnswered = true;
    }

    showFeedback(isCorrect, explanation) {
        const feedbackSection = document.getElementById('feedback-section');
        const feedbackMessage = document.getElementById('feedback-message');
        const explanationElement = document.getElementById('explanation');
        const nextBtn = document.getElementById('next-btn');

        feedbackMessage.className = `feedback-message ${isCorrect ? 'correct' : 'incorrect'}`;
        feedbackMessage.textContent = isCorrect ? 
            '✅ Risposta Corretta!' : 
            '❌ Risposta Errata';

        explanationElement.textContent = explanation;

        // Update next button text for last question
        if (this.currentQuestionIndex === this.questions.length - 1) {
            nextBtn.textContent = 'Visualizza Risultati';
        } else {
            nextBtn.textContent = 'Prossima Domanda';
        }

        feedbackSection.style.display = 'block';
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.displayQuestion();
        } else {
            this.showResults();
        }
    }

    showResults() {
        document.getElementById('quiz-section').style.display = 'none';
        document.getElementById('results-section').style.display = 'block';

        const percentage = Math.round((this.score / this.questions.length) * 100);
        const incorrectAnswers = this.questions.length - this.score;

        // Update results display
        document.getElementById('score-percentage').textContent = `${percentage}%`;
        document.getElementById('correct-answers').textContent = this.score;
        document.getElementById('total-questions').textContent = this.questions.length;
        document.getElementById('correct-count').textContent = this.score;
        document.getElementById('incorrect-count').textContent = incorrectAnswers;

        // Animate score circle
        this.animateScoreCircle(percentage);
    }

    animateScoreCircle(percentage) {
        const circle = document.querySelector('.score-circle');
        
        // Add animation class or change color based on score
        if (percentage >= 80) {
            circle.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
        } else if (percentage >= 60) {
            circle.style.background = 'linear-gradient(45deg, #ffc107, #fd7e14)';
        } else {
            circle.style.background = 'linear-gradient(45deg, #dc3545, #e83e8c)';
        }
    }

    restartQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.isAnswered = false;

        document.getElementById('results-section').style.display = 'none';
        document.getElementById('quiz-section').style.display = 'block';
        
        this.displayQuestion();
    }

    loadNewQuiz() {
        // Reset everything and go back to file upload
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.isAnswered = false;

        // Hide results and quiz sections
        document.getElementById('results-section').style.display = 'none';
        document.getElementById('quiz-section').style.display = 'none';
        
        // Show upload section and reset file input
        document.getElementById('upload-section').style.display = 'block';
        document.getElementById('file-info').style.display = 'none';
        document.getElementById('file-input').value = '';
    }
}

// Initialize the quiz application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});

// Add some utility functions for better UX
document.addEventListener('keydown', (e) => {
    // Allow keyboard navigation
    if (e.key === 'Enter') {
        const nextBtn = document.getElementById('next-btn');
        const startBtn = document.getElementById('start-quiz-btn');
        
        if (nextBtn.style.display !== 'none' && document.getElementById('quiz-section').style.display !== 'none') {
            nextBtn.click();
        } else if (startBtn.style.display !== 'none') {
            startBtn.click();
        }
    }
}); 