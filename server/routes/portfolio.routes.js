const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolio.controller');

// Input validation middleware
const validatePortfolioInput = (req, res, next) => {
  const { fullName, aboutMe, skills } = req.body;
  const errors = [];
  
  if (!fullName) {
    errors.push('Full name is required');
  }
  
  if (!aboutMe) {
    errors.push('About me is required');
  }
  
  if (!skills || !Array.isArray(skills) || skills.length === 0) {
    errors.push('At least one skill is required');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors
    });
  }
  
  next();
};

// Routes
router.post('/', validatePortfolioInput, portfolioController.createPortfolio);
router.get('/', portfolioController.getAllPortfolios);
router.get('/:id', portfolioController.getPortfolioById);
router.put('/:id', validatePortfolioInput, portfolioController.updatePortfolio);
router.delete('/:id', portfolioController.deletePortfolio);

module.exports = router;