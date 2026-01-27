const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minLength: 2,
            maxLength: 50,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        currency: {
            type: String,
            enum: ['USD', 'Rupee', 'EUR'],
            default: 'Rupee'
        },
        frequency: {
            type: String,
            required: true,
            enum: ['daily', 'weekly', 'biweekly', 'monthly', 'yearly']
        },
        category: {
            type: String,

            required: true,
        },
        payment: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            enum: ['active', 'cancelled', 'expired'],
            default: 'active',
        },
        startDate: {
            type: Date,
            required: true,
            validate: {
                validator: (value) => value <= new Date(),
                message: 'Start date must be in the past',
            }
        },
        renewalDate: {
            type: Date,
            validate: {
                validator: function (value) {
                    return value > this.startDate;
                },
                message: 'Renewal date must me after the start date'
            }
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true
        },
        workflowRunId: {
            type: String
        }
    }, { timestamps: true }
)

// auto calculate the renewal date
subscriptionSchema.pre('save', function () {
    if (!this.renewalDate && this.frequency) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            biweekly: 14,
            monthly: 30,
            yearly: 365
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency])
    }
    if (this.renewalDate < new Date()) {
        this.status = 'expired';
    }

});



const Subscription = mongoose.model('Subscription', subscriptionSchema);
module.exports = Subscription;
