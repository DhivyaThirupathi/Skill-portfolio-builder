const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required']
  },
  description: {
    type: String,
    required: [true, 'Project description is required']
  }
});

const PortfolioSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    minlength: [3, 'Full name must be at least 3 characters']
  },
  aboutMe: {
    type: String,
    required: [true, 'About me is required'],
    minlength: [50, 'About me must be at least 50 characters']
  },
  skills: {
    type: [String],
    required: [true, 'Skills are required'],
    validate: {
      validator: function(skills) {
        return skills.length > 0;
      },
      message: 'At least one skill is required'
    }
  },
  projects: {
    type: [ProjectSchema],
    default: []
  },
  achievements: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);