# -*- coding: gbk -*-

path_const = r'E:\WORK\F��Ŀ\SVN\cocostty\trunk\CocosTTY\Classes\tty_base\TTYDefine.h'
mb_root_path = r'E:\WORK\F��Ŀ\SVN\cocostty\branches\v1.0.5\CocosTTY\Resources\mb'

txt_path = r'E:\����\WORK\F��Ŀ\��Ŀ�з�\first\design\�������\TXT'

import sys,os

if os.path.isfile('config.txt'):
	print '�ҵ������ļ�config.txt'
	f = file('config.txt','r')
	for line in f:
		exec line

