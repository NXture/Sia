#!/usr/bin/env python
# -*- coding:utf-8 -*-

import utils
from datetime import datetime
import calendar


def run(string, entities):
    """Sia tells time and date"""
    string = string.lower()
    now = datetime.now()
    day = datetime.today()

    if string.find("time") != -1 and string.find("date") == -1:
        return utils.output('end', 'datetime', "Time is " + now.strftime("%I:%M %p"))
    elif string.find("date") != -1 and string.find("time") == -1:
        return utils.output('end', 'datetime', now.strftime("%B %d, %Y"))
    elif string.find("day") != -1:
        return utils.output('end', 'datetime', "Today is " + calendar.day_name[day.weekday()])
    elif string.find("time") != -1 and string.find("date") != -1:
        return utils.output('end', 'datetime', "Today's " + now.strftime(" date is %d-%m-%Y, and time is %I:%M %p"))
