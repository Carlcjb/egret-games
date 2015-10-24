# -*- coding: gbk -*-
'''
	mb_commonģ���Ǵ���mb���ݵ�һЩ���ú�������Ҫ�����ھ�mb������ϳɱ�񡣲������ڴ����Ͷ�ȡmb��
'''

import os
import sys
from mb_table import *
from mb_manager import *
import tty_const
import timeit

# �������еĹ��򣬸�ʽdict{'��������':[�Ƿ����ɹ�,���ɺ���,���map]}
g_generates = {}
def insert_generate_rule( func, name ):
	if g_generates.has_key(name):
		print 'insert_generate_rule�Ѿ���ͬ���Ĺ��򣬸���',name
	g_generates[name] = [False, func, {}]

def get_generate_result(name):
	if g_generates.has_key(name):
		l = g_generates[name]
		if l[0]:
			return l[2]
		else:
			l[2] = l[1]()
			l[0] = True
			return l[2]
	else:
		print '�Ҳ�������:', name
		return

# ����Ԫ�ز��뵽dict�����Ϊ��dict, key, list_or_value����
# ����������Σ�������� ��-�����б� ��ʽ��{key:[value,value2...]}
def append_to_listdict(m, k, l):
	if (not m.has_key(k)):
		if is_list_type(l):
			m[k] = l
		else:
			m[k] = [l]
	else:
		if is_list_type(l):
			m[k] += l
		else:
			m[k].append(l)

# ��append_to_listdict ��ͬ�����ǻ����ظ�����list����������ظ�
def append_to_listdict_no_repeat(m, k, l):
	if (not m.has_key(k)):
		if is_list_type(l):
			m[k] = l
		else:
			m[k] = [l]
	else:
		if is_list_type(l):
			new_elements = [x for x in l if m[k].count(x)==0]
			m[k] += new_elements
		else:
			if m[k].count(l) == 0:
				m[k].append(l)



def test_mb():
	print '-------test begin--------'
	print g_mbs[item_list]
	print g_mbs[item_list][2]
	print g_mbs[item_list][2][1]

	print 'item_use %d' % item_use
	print g_mbs[item_use]
	print g_mbs[item_use][2]
	print g_mbs[item_use][2][7]

# ˫��list��listdict�������list����
def longest_list_in_dict(m):
	max_len = -1
	max_k = None
	for k in m:
		if len(m[k]) > max_len:
			max_len = len(m[k])
			max_k = k
	return max_len

def write_listdict_to_file(m, name):
	f = open(name, 'w')
	for k in sorted(m):
		f.write(str(k))
		f.write('\t')
		for i in range(0, len(m[k])):
			if i>0:
				f.write('*')
			f.write(str(m[k][i]))
		f.write('\n')
	f.close()

# �ϲ����listdict��ʵ��ʹ��ʱm1��maps��keyӦ����ͬһ�ණ����m1��maps���Ǽ򵥵�listdict
# �ϲ�����ṹΪ {key:[[list1],[list2],...]}
def merge_dict(m1, *maps):
	m = m1
	# �Ѽ�listdict���nesting_listdict
	for k in m:
		m[k] = [m[k]]
	for m2 in maps:
		# ������ô���ȼ�һ�ţ���֤������ȷ
		for k in m:
			m[k].append([])
		num_cols = longest_list_in_dict(m)

		for k2 in m2:
			if k2 in m:
				m[k2][-1] = m2[k2]
			else:
				m[k2] = []
				for i in range(0,num_cols):
					m[k2].append([])
				m[k2][-1] = m2[k2]
	return m

# ��merge_dict�ĸ��ӽ��������ɱ��
def write_nesting_listdict_to_file(m, file_name, table_head='', id_col=0):
	f = open(file_name, 'w')
	if table_head != '':
		f.write(table_head)
		f.write('\n')
	for k in sorted(m):
		for g in range(0, len(m[k])):
			l = m[k][g]
			if g == id_col:
				f.write(str(k))
				f.write('\t')
			for i in range(0, len(l)):
				if i>0:
					f.write('*')
				f.write(str(l[i]))
			f.write('\t')
		f.write('\n')
	f.close()

		
if __name__ == '__main__':
	#print timeit.Timer('mb_manager.create_index_mbs()','import mb_manager').timeit(1)
	test_mb()
	print '���б�� %d ��' % len(g_mbs)

